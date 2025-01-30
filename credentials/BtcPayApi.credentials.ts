import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BtcPayApi implements ICredentialType {
	name = 'btcPayApi';

	displayName = 'BTCPay API';

	documentationUrl = 'https://docs.btcpayserver.org/API/Greenfield/v1/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'The API token created by the BTCPay server instance. It can be found in the BTCPay server under /account/apikeys.',
		},
		{
			displayName: 'Host',
			name: 'host',
			type: 'string',
			default: '',
			placeholder: 'http(s)://localhost:8080',
			description: 'The origin of you BTCPay server instance. Should include the protocol and port, but no route information and no trailing slash.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=token {{ $credentials.apiToken }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.host }}',
			url: '/api/v1/stores',
		},
	};
}
