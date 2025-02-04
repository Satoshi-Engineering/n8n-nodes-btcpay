import type { Request } from 'express';
import { mock } from 'jest-mock-extended';
import type { IWebhookFunctions } from 'n8n-workflow';

import { BtcPayTrigger } from '../BtcPayTrigger.node';

describe('Test BtcPayTrigger Node', () => {
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
		const node = new BtcPayTrigger();
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

			const returnData = await node.webhook.call(context);
			expect(returnData.webhookResponse.status).toBe(200);
			expect(returnData.workflowData).toBeUndefined();
		});

		it('should return 403 with an invalid signature', async () => {
      context.getBodyData.mockReturnValue(bodyDataCompleted)
      req.rawBody = Buffer.from(JSON.stringify(bodyDataCompleted, undefined, 2), 'utf8');

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

			const returnData = await node.webhook.call(context);
			expect(returnData.webhookResponse.status).toBe(200);
			expect(returnJsonArray).toHaveBeenCalledWith([bodyDataCompleted]);
			expect(returnData.workflowData).toEqual([[bodyDataCompleted]]);
		});
	});
});
