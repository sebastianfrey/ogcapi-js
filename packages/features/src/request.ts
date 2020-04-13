/**
 * send get request
 * @param url
 * @param params
 */
export default async function request(url: string, params: requestParams = {}): Promise<any> {
  const requestUrl = new URL(url);
  requestUrl.searchParams.set('f', 'json');

  for (const key in params) {
    requestUrl.searchParams.set(key, params[key].toString());
  }

  const res: Response = await fetch(requestUrl.href, {
    method: 'GET'
  });

  return res.json();
}

export interface requestParams {
  [key: string]: any;
}