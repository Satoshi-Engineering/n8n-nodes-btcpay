import type { Request } from 'express';
import { mock } from 'jest-mock-extended';
import {
	NodeApiError,
	NodeOperationError,
	type IHookFunctions,
	type IWebhookFunctions,
} from 'n8n-workflow';

import { BtcPayTrigger } from '../BtcPayTrigger.node';

const btcPayServerHost = 'https://btcpayserver.com';
const storeId = 'someRandomStoreId';
const webhookUrl = 'http://localhost:5678/webhook';
const webhookId = 'someRandomWebhookId';
const webhookSecret = 'someRandomWebhookSecret';

describe('Test BtcPayTrigger Node', () => {
	describe('handle webhook check if exists', () => {
		const context = mock<IHookFunctions>();
		context.getCredentials.mockReturnValue(Promise.resolve({ host: btcPayServerHost }));
		context.getWorkflowStaticData.mockReturnValue({});
		context.getNodeWebhookUrl.mockReturnValue(webhookUrl);
		context.getNodeParameter.calledWith('storeId', 0).mockReturnValue(storeId);
		context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve([]));

		it('should return false if webhook data is missing', async () => {
			const node = new BtcPayTrigger();

			const returnData = await node.webhookMethods.default.checkExists.call(context);

			expect(returnData).toBe(false);
		});

		it('should query webhooks from the correct store', async () => {
			context.getWorkflowStaticData.mockReturnValue({
				webhookId,
				webhookSecret,
			});
			const node = new BtcPayTrigger();

			await node.webhookMethods.default.checkExists.call(context);

			expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', { 
				method: 'GET',
				url: `${btcPayServerHost}/api/v1/stores/${storeId}/webhooks`,
			});
		});

		it('should throw a NodeApiError if the request fails', async () => {
			context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.reject('error'));
			const node = new BtcPayTrigger();

			await expect(() => node.webhookMethods.default.checkExists.call(context)).rejects.toThrow(NodeApiError);
		});

		it('should return true if the webhook url is found', async () => {
			context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve([{
				url: webhookUrl,
			}]));
			const node = new BtcPayTrigger();

			const returnData = await node.webhookMethods.default.checkExists.call(context);

			expect(returnData).toBe(true);
		});

		it('should return false if the webhook url is not found', async () => {
			context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve([{
				url: 'http://localhost:5678/other-webhook',
			}]));
			const node = new BtcPayTrigger();

			const returnData = await node.webhookMethods.default.checkExists.call(context);

			expect(returnData).toBe(false);
		});
	});

	describe('handle webhook create', () => {
		const context = mock<IHookFunctions>();
		context.getCredentials.mockReturnValue(Promise.resolve({ host: btcPayServerHost }));
		context.getWorkflowStaticData.mockReturnValue({});
		context.getNodeWebhookUrl.mockReturnValue(webhookUrl);
		context.getNodeParameter.calledWith('storeId', 0).mockReturnValue(storeId);
		context.getNodeParameter.calledWith('eventName', 0).mockReturnValue('someRandomEvent');
		context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve({
			id: webhookId,
			secret: webhookSecret,
		}));

		it('should throw an error if the selected event is not recognized', async () => {
			const node = new BtcPayTrigger();

			await expect(() => node.webhookMethods.default.create.call(context)).rejects.toThrow(NodeOperationError);
		});

		it('should map the paymentRequestCompleted event name to the btcpay event name', async () => {
			context.getNodeParameter.calledWith('eventName', 0).mockReturnValue('paymentRequestCompleted');
			const node = new BtcPayTrigger();

			await node.webhookMethods.default.create.call(context);

			expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', expect.objectContaining({ 
				body: expect.objectContaining({
					authorizedEvents: {
						everything: false,
						specificEvents: ['PaymentRequestStatusChanged'],
					},
				}),
			}));
		});

		it('should post the new webhook to the correct store', async () => {
			const node = new BtcPayTrigger();

			const result = await node.webhookMethods.default.create.call(context);

			expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', expect.objectContaining({
				method: 'POST',
				url: `${btcPayServerHost}/api/v1/stores/${storeId}/webhooks`,
			}));
			expect(result).toBe(true);
		});

		it('should write the webhook id and secret to the static data', async () => {
			const staticNodeData: Record<string, string> = {};
			context.getWorkflowStaticData.mockReturnValue(staticNodeData);
			const node = new BtcPayTrigger();

			await node.webhookMethods.default.create.call(context);

			expect(staticNodeData.webhookId).toBe(webhookId);
			expect(staticNodeData.webhookSecret).toBe(webhookSecret);
		});

		it('should throw a NodeApiError if the request fails', async () => {
			context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.reject('error'));

			const node = new BtcPayTrigger();

			await expect(() => node.webhookMethods.default.create.call(context)).rejects.toThrow(NodeApiError);
		});
	});

	describe('handle webhook delete', () => {
		const context = mock<IHookFunctions>();
		context.getCredentials.mockReturnValue(Promise.resolve({ host: btcPayServerHost }));
		context.getWorkflowStaticData.mockReturnValue({});
		context.getNodeWebhookUrl.mockReturnValue(webhookUrl);
		context.getNodeParameter.calledWith('storeId', 0).mockReturnValue(storeId);
		context.getNodeParameter.calledWith('eventName', 0).mockReturnValue('someRandomEvent');
		context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve({
			id: webhookId,
			secret: webhookSecret,
		}));

		it('should return true if webhook data is missing', async () => {
			const node = new BtcPayTrigger();

			const returnData = await node.webhookMethods.default.delete.call(context);

			expect(returnData).toBe(true);
		});

		it('should delete the webhook from the correct store', async () => {
			context.getWorkflowStaticData.mockReturnValue({
				webhookId,
				webhookSecret,
			});
			const node = new BtcPayTrigger();

			const returnData = await node.webhookMethods.default.delete.call(context);

			expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', {
				method: 'DELETE',
				url: `${btcPayServerHost}/api/v1/stores/${storeId}/webhooks/${webhookId}`,
			});
			expect(returnData).toBe(true);
		});

		it('should delete the webhook id and secret from the static data', async () => {
			const staticNodeData: Record<string, string> = {
				webhookId,
				webhookSecret,
			};
			context.getWorkflowStaticData.mockReturnValue(staticNodeData);
			const node = new BtcPayTrigger();

			await node.webhookMethods.default.delete.call(context);

			expect(staticNodeData).toEqual({});
		});

		it('should throw a NodeApiError if the request fails', async () => {
			const staticNodeData: Record<string, string> = {
				webhookId,
				webhookSecret,
			};
			context.getWorkflowStaticData.mockReturnValue(staticNodeData);
			context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.reject('error'));
			const node = new BtcPayTrigger();

			await expect(() => node.webhookMethods.default.delete.call(context)).rejects.toThrow(NodeApiError);

			expect(staticNodeData).toEqual({
				webhookId,
				webhookSecret,
			});
		});
	});

	describe('handle paymentRequestCompleted webhook', () => {
    const bodyDataPending = {
      deliveryId: 'XhWq8Yt3CwGbxBSRNuQFeN',
      webhookId: 'RPmHuKhkKqmZVX854QqHHr',
      originalDeliveryId: '__test__a6f47008-c8e7-4965-9173-532fb3d5d04b__test__',
      isRedelivery: false,
      type: 'PaymentRequestStatusChanged',
      timestamp: 1738660312,
      storeId: '9BatxYQgpxRKXfkZxoWCa324sbkcVmfJVjQixBCP7NYm',
      paymentRequestId: '__test__bc786aa8-8f1c-40ee-a80d-2cfd69f4d128__test__',
      status: 'Pending',
    };
		const bodyDataCompleted = {
			...bodyDataPending,
      status: 'Completed',
		}
		const returnJsonArray = jest.fn((value) => value);
		const context = mock<IWebhookFunctions>({
			nodeHelpers: mock(),
			helpers: {
				returnJsonArray,
			},
		});
		context.getNodeParameter.calledWith('eventName', 0).mockReturnValue('paymentRequestCompleted');
		const req = mock<Request>();
		context.getRequestObject.mockReturnValue(req);
		context.getWorkflowStaticData.mockReturnValue({
			webhookSecret: '24rQ58xd7fxH1DpRU4K9Yp68i5jX',
		})
		context.getHeaderData.mockReturnValue({
			'btcpay-sig': 'sha256=52aa466f504e546c10fd07f906ab6b4a710d2df496e8f14c5e217ccd473e813b',
		});

		it('should stop if the status is not "Completed"', async () => {
      context.getBodyData.mockReturnValue(bodyDataPending)
      req.rawBody = Buffer.from(JSON.stringify(bodyDataPending, undefined, 2), 'utf8');
			const node = new BtcPayTrigger();

			const returnData = await node.webhook.call(context);

			expect(returnData.webhookResponse.status).toBe(200);
			expect(returnData.workflowData).toBeUndefined();
		});

		it('should return 403 with an invalid signature', async () => {
      context.getBodyData.mockReturnValue(bodyDataCompleted)
      req.rawBody = Buffer.from(JSON.stringify(bodyDataCompleted, undefined, 2), 'utf8');
			const node = new BtcPayTrigger();

			const returnData = await node.webhook.call(context);

			expect(returnData.webhookResponse.status).toBe(403);
			expect(returnData.workflowData).toBeUndefined();
		});

		it('should return the body data', async () => {
      context.getBodyData.mockReturnValue(bodyDataCompleted)
      req.rawBody = Buffer.from(JSON.stringify(bodyDataCompleted, undefined, 2), 'utf8');
			context.getHeaderData.mockReturnValue({
				'btcpay-sig': 'sha256=520e50c33de020dbe5c55e58899ad2db29caf6faa72131686d342ffc02e8b891',
			});
			const node = new BtcPayTrigger();

			const returnData = await node.webhook.call(context);

			expect(returnData.webhookResponse.status).toBe(200);
			expect(returnJsonArray).toHaveBeenCalledWith([bodyDataCompleted]);
			expect(returnData.workflowData).toEqual([[bodyDataCompleted]]);
		});
	});
});
