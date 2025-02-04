import type { Request } from 'express';
import { mock } from 'jest-mock-extended';
import type { IWebhookFunctions } from 'n8n-workflow';

import { BtcPayTrigger } from '../BtcPayTrigger.node';

describe('Test BtcPayTrigger Node', () => {
	describe('handle paymentRequestCompleted webhook', () => {
    const bodyData = {
      deliveryId: 'XhWq8Yt3CwGbxBSRNuQFeN',
      webhookId: 'RPmHuKhkKqmZVX854QqHHr',
      originalDeliveryId: '__test__a6f47008-c8e7-4965-9173-532fb3d5d04b__test__',
      isRedelivery: false,
      type: 'PaymentRequestStatusChanged',
      timestamp: 1738660312,
      storeId: '9BatxYQgpxRKXfkZxoWCa324sbkcVmfJVjQixBCP7NYm',
      paymentRequestId: '__test__bc786aa8-8f1c-40ee-a80d-2cfd69f4d128__test__',
      status: 'Pending'
    };
		const node = new BtcPayTrigger();
		const context = mock<IWebhookFunctions>({
			nodeHelpers: mock(),
		});
		context.getNodeParameter.calledWith('eventName', 0).mockReturnValue('paymentRequestCompleted');
		const req = mock<Request>();
		context.getRequestObject.mockReturnValue(req);

		it('should stop if the status is not "Completed"', async () => {
      context.getBodyData.mockReturnValue(bodyData)
      req.rawBody = Buffer.from(JSON.stringify(bodyData), 'utf8');

			const returnData = await node.webhook.call(context);
			expect(returnData.webhookResponse.status).toBe(200);
			expect(returnData.workflowData).toBeUndefined();
		});
	});
});
