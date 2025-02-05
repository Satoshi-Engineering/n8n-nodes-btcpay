import crypto from 'crypto';
import {
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
  NodeApiError,
  JsonObject,
  BINARY_ENCODING,
  NodeOperationError,
} from 'n8n-workflow';

import { apiRequest, getStores } from './GenericFunctions';

export class BtcPayTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BTCPay Trigger',
		name: 'btcPayTrigger',
		icon: 'file:btcPay.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow on a BTCPay event',
		defaults: {
			name: 'BTCPay Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'btcPayApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Store Name or ID',
				name: 'storeId',
				type: 'options',
				default: '',
				required: true,
				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
				typeOptions: {
					loadOptionsDependsOn: ['authentication'],
					loadOptionsMethod: 'getStores',
				},
			},
      {
        displayName: 'This node automatically generates a Webhook in the selected BTCpay Server store when your n8n workflow is activated. No need to create it manually.',
        name: 'webhookInformation',
        type: 'notice',
        default: '',
      },
			{
				displayName: 'Event',
				name: 'eventName',
				type: 'options',
				default: 'paymentRequestCompleted',
				required: true,
				description: 'What type of event should trigger the workflow?',
        options: [{
          name: 'Payment Request Completed',
          value: 'paymentRequestCompleted',
        }]
			},
      {
        displayName: 'You can test this webhook in BTCpay Server by triggering the "Payment Request Status Changed" event. However, the status will always be "Pending," meaning the trigger won\'t proceed unless a real payment request is fully completed. The output will include the "paymentRequestId" along with other details. For more information, refer to the BTCpay Server API documentation.',
        name: 'webhookTesting',
        type: 'notice',
        default: '',
        displayOptions: {
					show: {
						eventName: ['paymentRequestCompleted'],
					}
				},
      },
		],
	};

	methods = {
		loadOptions: {
			getStores,
		},
	};

	webhookMethods = {
		default: {
      // check if the webhook already exists in btcPay
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
        if (
          webhookData.webhookId == null
          || webhookData.webhookSecret == null
        ) {
          return false;
        }

				const webhookUrl = this.getNodeWebhookUrl('default');

        const storeId = this.getNodeParameter('storeId', 0) as string;

        try {
          const responseData = await apiRequest.call(this, {
            url: `/api/v1/stores/${storeId}/webhooks`,
            method: 'GET',
          });
          for (const webhook of responseData) {
            if (webhook.url === webhookUrl) {
              return true;
            }
          }
        } catch (error) {
          throw new NodeApiError(this.getNode(), error as JsonObject);
        }

				return false;
			},

      // create the webhook in btcPay
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');

        const storeId = this.getNodeParameter('storeId', 0) as string;
        const selectedEvent = this.getNodeParameter('eventName', 0) as string;
        const authorizedEvents: {
          everything: boolean,
          specificEvents: string[],
        } = {
          everything: false,
          specificEvents: [],
        };
        if (selectedEvent === 'paymentRequestCompleted') {
          authorizedEvents.specificEvents.push('PaymentRequestStatusChanged');
        } else {
          throw new NodeOperationError(this.getNode(), 'The selected event is not implemented yet');
        }

        try {
          const responseData = await apiRequest.call(this, {
            url: `/api/v1/stores/${storeId}/webhooks`,
            method: 'POST',
            body: {
              enabled: true,
              automaticRedelivery: true,
              url: webhookUrl,
              authorizedEvents,
            }
          });

          const webhookData = this.getWorkflowStaticData('node');
          webhookData.webhookId = responseData.id;
          webhookData.webhookSecret = responseData.secret;
        } catch (error) {
          throw new NodeApiError(this.getNode(), error as JsonObject);
        }

				return true;
			},

      // delete the webhook in btcPay
			async delete(this: IHookFunctions): Promise<boolean> {
        const storeId = this.getNodeParameter('storeId', 0) as string;

        try {
          const webhookData = this.getWorkflowStaticData('node');
          if (webhookData.webhookId == null) {
            return true
          }
          await apiRequest.call(this, {
            url: `/api/v1/stores/${storeId}/webhooks/${webhookData.webhookId}`,
            method: 'DELETE',
          });
          delete webhookData.webhookId;
          delete webhookData.webhookSecret;
        } catch (error) {
          throw new NodeApiError(this.getNode(), error as JsonObject);
        }

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    await validateSignature(this);
    return handleEvent(this);
	}
}

async function validateSignature(context: IWebhookFunctions): Promise<void> {
  const signature = getSignatureFromHeader(context);
  const expectedSignature = await signBody(context);
  if (signature != expectedSignature) {
    throw new NodeApiError(context.getNode(), {}, {
      message: 'Invalid signature',
      httpCode: '403',
    });
  }
}

function getSignatureFromHeader(context: IWebhookFunctions): string {
  const headerData = context.getHeaderData();
  const btcPaySig = headerData['btcpay-sig'] as string;
  return btcPaySig.split('=')[1];
}

async function signBody(context: IWebhookFunctions): Promise<string> {
  const secret = getSecret(context);
  const body = await getRawBody(context);
  return crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
}

function getSecret(context: IWebhookFunctions): string {
  const webhookData = context.getWorkflowStaticData('node');
  if (typeof webhookData.webhookSecret !== 'string') {
    throw new NodeOperationError(context.getNode(), 'Webhook secret not found');
  }
  return webhookData.webhookSecret;
}

async function getRawBody(context: IWebhookFunctions): Promise<string> {
  const request = context.getRequestObject();
  if (!request.rawBody) {
    await request.readRawBody();
  }
  const data = (request.rawBody ?? '').toString(BINARY_ENCODING)
  return Buffer.from(data, 'base64').toString('utf8')
}

function handleEvent(context: IWebhookFunctions): IWebhookResponseData {
  const selectedEvent = context.getNodeParameter('eventName', 0) as string;
  if (selectedEvent === 'paymentRequestCompleted') {
    return onPaymentRequestCompleted(context)
  }
  throw new NodeOperationError(context.getNode(), `The selected event "${selectedEvent}" is not supported!`);
}

function onPaymentRequestCompleted(context: IWebhookFunctions): IWebhookResponseData {
  const bodyData = context.getBodyData();

  // only handle completed payment requests
  if (
    bodyData.type !== 'PaymentRequestStatusChanged'
    || bodyData.status !== 'Completed'
  ) {
    return {
      webhookResponse: {
        status: 200,
        message: 'Event discarded, only completed payment requests are accepted',
      },
      workflowData: undefined,
    };
  }

  return {
    webhookResponse: {
      status: 200,
      message: 'The selected event is not implemented yet',
    },
    workflowData: [context.helpers.returnJsonArray([bodyData])],
  };
}
