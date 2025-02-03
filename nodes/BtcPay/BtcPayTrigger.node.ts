import {
	type IHookFunctions,
	type IWebhookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type IWebhookResponseData,
  NodeApiError,
  JsonObject,
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
				displayName: 'Event',
				name: 'authorizedEvent',
				type: 'options',
				default: 'paymentRequestCompleted',
				required: true,
				description: 'What type of event should trigger the workflow?',
        options: [{
          name: 'Payment Request Fulfilled',
          value: 'paymentRequestCompleted',
        }]
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
        const authorizedEvent = this.getNodeParameter('authorizedEvent', 0) as string;
        const authorizedEvents: {
          everything: boolean,
          specificEvents: string[],
        } = {
          everything: false,
          specificEvents: [],
        };
        if (authorizedEvent === 'paymentRequestCompleted') {
          authorizedEvents.specificEvents.push('PaymentRequestStatusChanged');
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
		const bodyData = this.getBodyData();

    const authorizedEvent = this.getNodeParameter('authorizedEvent', 0) as string;

    if (authorizedEvent === 'paymentRequestCompleted') {
      // only handle completed payment requests
      if (bodyData.status !== 'Completed') {
        return {
          webhookResponse: {
            status: 200,
            message: 'Event discarded, only completed payment requests are accepted',
          },
          workflowData: undefined,
        };
      }

      // validate signature
      const webhookData = this.getWorkflowStaticData('node');
      const signature = this.getHeaderData()['btcpay-sig'].split('=')[1];
      const body = this.getRequestObject().body
      if (typeof webhookData.webhookSecret !== 'string') {
        return {
          webhookResponse: {
            status: 500,
            message: 'Webhook secret not found',
          },
          workflowData: undefined,
        };
      }

      const Webhooks = await import('@octokit/webhooks');
      const webhooks = new Webhooks.Webhooks({
        secret: webhookData.webhookSecret,
      });
      const valid = await webhooks.verify(body, signature)
      if (!valid) {
        return {
          webhookResponse: {
            status: 403,
            message: 'Invalid signature',
          },
          workflowData: undefined,
        };
      }

      // execute next node
      return {
        webhookResponse: {
          status: 200,
          message: 'The selected event is not implemented yet',
        },
        workflowData: [this.helpers.returnJsonArray([bodyData])],
      };
    }

    return {
      webhookResponse: {
        status: 404,
        message: 'The selected event is not implemented yet',
      },
      workflowData: undefined,
    };
	}
}
