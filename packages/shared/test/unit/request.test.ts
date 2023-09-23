import { mockRequest } from '@ogcapi-js/test-utils';
import { request } from '../../src/request';

test('request() should send a GET request with f=json', async () => {
  mockRequest('https://www.example.com?f=json', {
    success: true,
  });

  const result = await request({
    url: 'https://www.example.com',
  });
  expect(result.success).toBe(true);
});

test('request() should throw the request error', async () => {
  mockRequest('https://www.example.com?f=json', 500);

  try {
    await request({
      url: 'https://www.example.com',
    });
    expect(true).toBe(false);
  } catch (error) {
    expect((error as Error).message).toBe('Internal Server Error');
  }
});

test('request() should accept additional parameters', async () => {
  mockRequest('https://www.example.com?f=json&test=true&num=1&content=test', {
    success: true,
  });

  const result = await request({
    url: 'https://www.example.com',
    params: {
      test: true,
      num: 1,
      content: 'test',
    },
  });
  expect(result.success).toBe(true);
});

test('request() should accept date formatted parameter', async () => {
  mockRequest(
    'https://www.example.com?f=json&datetime=2014-01-01T00%3A00%3A00.000Z%2F2014-01-02T00%3A00%3A00.000Z',
    {
      success: true,
    }
  );

  const result = await request({
    url: 'https://www.example.com',
    params: {
      datetime: '2014-01-01T00:00:00.000Z/2014-01-02T00:00:00.000Z',
    },
  });
  expect(result.success).toBe(true);
});

test('request() should forward headers ', async () => {
  mockRequest(
    'https://www.example.com',
    {
      success: true,
    },
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'accept-language': '*',
      },
    }
  );

  const result = await request({
    url: 'https://www.example.com',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'accept-language': '*',
    },
  });
  expect(result.success).toBe(true);
});

test('request() should send JSON when content-type header is application/json ', async () => {
  mockRequest(
    'https://www.example.com',
    {
      success: true,
    },
    {
      method: 'POST',
      body: { f: 'json' },
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  const result = await request({
    url: 'https://www.example.com',
    method: 'POST',
    params: { f: 'json' },
    headers: {
      'content-type': 'application/json',
    },
  });
  expect(result.success).toBe(true);
});
