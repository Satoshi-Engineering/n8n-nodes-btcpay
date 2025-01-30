import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

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
		properties: [
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
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let myString: string;

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				myString = this.getNodeParameter('myString', itemIndex, '') as string;
				item = items[itemIndex];

				item.json.myString = myString;
			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return [items];
	}
}
