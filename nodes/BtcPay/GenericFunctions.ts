import {
  IAllExecuteFunctions,
  IDataObject,
  IHttpRequestOptions,
} from 'n8n-workflow';

export async function apiRequest(
  this: IAllExecuteFunctions,
  options: IHttpRequestOptions,
) {
  const credentials = await this.getCredentials('btcPayApi');
  const host = new URL(credentials.host);
  const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'btcPayApi', {
    ...options,
    url: `${host.origin}${options.url}`,
  });
  return responseData;
}

export async function getStores(this: IAllExecuteFunctions) {
  const defaultResponse = [{ name: 'No stores available', value: 'none' }];

  try {
    const responseData = await apiRequest.call(this, {
      url: `/api/v1/stores`,
      method: 'GET',
    });
    if (responseData.length === 0) {
      return defaultResponse;
    }
    return responseData.map((store: IDataObject) => ({ name: store.name, value: store.id }));
  } catch {
    return defaultResponse;
  }
}
