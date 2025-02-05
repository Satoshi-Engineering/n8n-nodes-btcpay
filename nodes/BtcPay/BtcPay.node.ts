import {
	JsonObject,
	NodeApiError,
	NodeOperationError,
	type IDataObject,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { apiRequest, getStores } from './GenericFunctions';

export class BtcPay implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BTCPay',
		name: 'btcPay',
		icon: 'file:btcPay.svg',
		group: [],
		version: 1,
		description: 'BtcPay node with some basic functionality. Will get extended in the future.',
		defaults: {
			name: 'BTCPay',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'btcPayApi',
				required: true,
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'PaymentRequest',
						value: 'paymentRequest',
					},
				],
				default: 'paymentRequest',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['paymentRequest'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new payment request',
						action: 'Create a new payment request',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an existing payment request',
						action: 'Get an existing payment request',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				required: true,
				default: 10.00,
				typeOptions: {
					minValue: 0,
					numberPrecision: 2,
				},
				placeholder: 'Payment amount',
				description: 'The amount of the payment request. Has to be greater than 0. Will use the default currency of the store, unless you change it with a custom field "currency".',
				displayOptions: {
					show: {
						resource: ['paymentRequest'],
						operation: ['create']
					}
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'Payment title',
				description: 'The title in BTCPay. E.g. use the order number.',
				displayOptions: {
					show: {
						resource: ['paymentRequest'],
						operation: ['create']
					}
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValueButtonText: 'Add Field to Send',
					multipleValues: true,
				},
				placeholder: 'Add Field',
				description: 'Add additional fields, e.g. currency. Refer to https://docs.btcpayserver.org/API/Greenfield/v1/#operation/PaymentRequests_CreatePaymentRequest for more information.',
				options: [
					{
						displayName: 'Field',
						name: 'fieldValues',
						values: [
							{
								displayName: 'Field Name',
								name: 'fieldName',
								type: 'string',
								required: true,
								default: '',
							},
							{
								displayName: 'Field Value',
								name: 'fieldValue',
								type: 'string',
								required: true,
								default: '',
							},
						],
					},
				],
				displayOptions: {
					show: {
						resource: ['paymentRequest'],
						operation: ['create']
					}
				},
			},
			{
				displayName: 'Payment ID',
				name: 'paymentRequestId',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'Payment request ID',
				description: 'The ID of the payment request to fetch',
				displayOptions: {
					show: {
						resource: ['paymentRequest'],
						operation: ['get']
					}
				},
			}
		],
	};

	methods = {
		loadOptions: {
			getStores,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const responseData = await executeForItem(this, itemIndex);
				returnData.push(responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.toString() });
				} else {
					throw error;
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}

async function executeForItem(context: IExecuteFunctions, itemIndex: number) {
	const resource = context.getNodeParameter('resource', 0) as string;
	const operation = context.getNodeParameter('operation', 0) as string;

	if (resource === 'paymentRequest') {
		if (operation === 'create') {
			return createPaymentRequest(context, itemIndex);
		} else if (operation === 'get') {
			return getPaymentRequest(context, itemIndex);
		} else {
			throw new NodeOperationError(context.getNode(), `The operation "${operation}" is not supported for payment requests!`);
		}
	} else {
		throw new NodeOperationError(context.getNode(), `The resource "${resource}" is not supported!`);
	}
}

async function createPaymentRequest(context: IExecuteFunctions, itemIndex: number) {
	const storeId = context.getNodeParameter('storeId', 0) as string;
	const amount = context.getNodeParameter('amount', itemIndex) as number;
	const title = context.getNodeParameter('title', itemIndex) as string;
	const additionalFields = context.getNodeParameter('additionalFields', itemIndex) as {
		fieldValues?: Array<{
			fieldName: string;
			fieldValue: string;
		}>
	};

	const body: IDataObject = {
		amount,
		title,
	};
	(additionalFields.fieldValues ?? []).forEach(({ fieldName, fieldValue }) => {
		body[fieldName] = fieldValue
	})

	try {
		const responseData = await apiRequest.call(context, {
			url: `/api/v1/stores/${storeId}/payment-requests`,
			method: 'POST',
			body,
		});
		return responseData;
	} catch (error) {
		throw new NodeApiError(context.getNode(), error as JsonObject);
	}
}

async function getPaymentRequest(context: IExecuteFunctions, itemIndex: number) {
	const storeId = context.getNodeParameter('storeId', 0) as string;
	const paymentRequestId = context.getNodeParameter('paymentRequestId', itemIndex) as string;

	try {
		const responseData = await apiRequest.call(context, {
			url: `/api/v1/stores/${storeId}/payment-requests/${paymentRequestId}`,
			method: 'GET',
		});
		return responseData;
	} catch (error) {
		throw new NodeApiError(context.getNode(), error as JsonObject);
	}
}
