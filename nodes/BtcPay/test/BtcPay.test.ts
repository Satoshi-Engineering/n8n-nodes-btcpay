import { mock, anyNumber } from 'jest-mock-extended';
import {
  IExecuteFunctions,
  NodeApiError,
  NodeOperationError,
} from 'n8n-workflow';

import { BtcPay } from '../BtcPay.node';

const btcPayServerHost = 'https://btcpayserver.com';
const storeId = 'someRandomStoreId';

describe('Test BtcPay Node', () => {
  describe('handle paymentRequest.create', () => {
    let context = mock<IExecuteFunctions>();

    beforeEach(() => {
      context.getCredentials.mockReturnValue(Promise.resolve({ host: btcPayServerHost }));
      context.getInputData.mockReturnValue([{ json: {} }]);
      context.getNodeParameter.calledWith('storeId', 0).mockReturnValue(storeId);
      context.getNodeParameter.calledWith('resource', 0).mockReturnValue('paymentRequest');
      context.getNodeParameter.calledWith('operation', 0).mockReturnValue('create');
      context.getNodeParameter.calledWith('amount', anyNumber()).mockReturnValue(100);
      context.getNodeParameter.calledWith('title', anyNumber()).mockReturnValue('Some Title');
      context.getNodeParameter.calledWith('additionalFields', anyNumber()).mockReturnValue({});
      context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve([]));
      context.helpers.returnJsonArray = jest.fn();
    })

    it('should set amount and title', async () => {
      const node = new BtcPay();

      await node.execute.call(context);

      expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', {
        method: 'POST',
        url: `${btcPayServerHost}/api/v1/stores/${storeId}/payment-requests`,
        body: {
          amount: 100,
          title: 'Some Title',
        },
      });
    });

    it('should handle multiple items', async () => {
      context.getInputData.mockReturnValue([{ json: {} }, { json: {} }]);
      const node = new BtcPay();

      await node.execute.call(context);

      expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledTimes(2);
    });

    it('should handle additional fields', async () => {
      context.getNodeParameter.calledWith('additionalFields', anyNumber()).mockReturnValue({
        fieldValues: [
          { fieldName: 'someField', fieldValue: 'someValue' },
        ],
      });
      const node = new BtcPay();

      await node.execute.call(context);

      expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', expect.objectContaining({
        body: {
          amount: 100,
          title: 'Some Title',
          someField: 'someValue',
        },
      }));
    });

    it('should throw a NodeApiError if the request fails', async () => {
      context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.reject('error'));

      const node = new BtcPay();

      await expect(() => node.execute.call(context)).rejects.toThrow(NodeApiError);
    });
  });

  describe('handle paymentRequest.get', () => {
    let context = mock<IExecuteFunctions>();

    beforeEach(() => {
      context.getCredentials.mockReturnValue(Promise.resolve({ host: btcPayServerHost }));
      context.getInputData.mockReturnValue([{ json: {} }]);
      context.getNodeParameter.calledWith('storeId', 0).mockReturnValue(storeId);
      context.getNodeParameter.calledWith('resource', 0).mockReturnValue('paymentRequest');
      context.getNodeParameter.calledWith('operation', 0).mockReturnValue('get');
      context.getNodeParameter.calledWith('paymentRequestId', anyNumber()).mockReturnValue('somePaymentRequestId');
      context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.resolve([]));
      context.helpers.returnJsonArray = jest.fn();
    })

    it('should get the data from the correct store', async () => {
      const node = new BtcPay();

      await node.execute.call(context);

      expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledWith('btcPayApi', {
        method: 'GET',
        url: `${btcPayServerHost}/api/v1/stores/${storeId}/payment-requests/somePaymentRequestId`,
      });
    });

    it('should handle multiple items', async () => {
      context.getInputData.mockReturnValue([{ json: {} }, { json: {} }]);
      const node = new BtcPay();

      await node.execute.call(context);

      expect(context.helpers.httpRequestWithAuthentication).toHaveBeenCalledTimes(2);
    });

    it('should throw a NodeApiError if the request fails', async () => {
      context.helpers.httpRequestWithAuthentication = jest.fn().mockReturnValue(Promise.reject('error'));

      const node = new BtcPay();

      await expect(() => node.execute.call(context)).rejects.toThrow(NodeApiError);
    });
  });

  describe('handle unknown resources and operations', () => {
    let context = mock<IExecuteFunctions>();

    beforeEach(() => {
      context.getCredentials.mockReturnValue(Promise.resolve({ host: btcPayServerHost }));
      context.getInputData.mockReturnValue([{ json: {} }]);
      context.getNodeParameter.calledWith('storeId', 0).mockReturnValue(storeId);
      context.getNodeParameter.calledWith('resource', 0).mockReturnValue('paymentRequest');
      context.getNodeParameter.calledWith('operation', 0).mockReturnValue('get');
    })

    it('should throw if the resource is not handled', async () => {
      context.getNodeParameter.calledWith('resource', 0).mockReturnValue('someUnknownResource');

      const node = new BtcPay();

      await expect(() => node.execute.call(context)).rejects.toThrow(NodeOperationError);
    });

    it('should throw if the operation is not handled', async () => {
      context.getNodeParameter.calledWith('operation', 0).mockReturnValue('someUnknownOperation');

      const node = new BtcPay();

      await expect(() => node.execute.call(context)).rejects.toThrow(NodeOperationError);
    });
  });
});
