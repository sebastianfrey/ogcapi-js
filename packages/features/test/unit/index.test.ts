import { Service } from '../../src/index';
import mockRequest from '../mock-request';

test('it should throw an error for bad base url', async function() {
  expect(() => {
    new Service({ baseUrl: 'dsfsdf' });
  }).toThrowError();
});

test('getConformance() should return a list of conformances', async function() {
  mockRequest('https://service.com/conformance?f=json', {
    conformsTo: ['test'],
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getConformance();
  expect(result.conformsTo).toEqual(['test']);
});

test('getCollections() should return a list of collections', async function() {
  mockRequest('https://service.com/collections?f=json', {
    collections: [{ id: 'test', links: [] }],
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getCollections();
  expect(result.collections).toEqual([{ id: 'test', links: [] }]);
});

test('getCollection() should return a collection', async function() {
  mockRequest('https://service.com/collections/test?f=json', {
    id: 'test',
    links: [],
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getCollection('test');
  expect(result).toEqual({ id: 'test', links: [] });
});

test('getFeatures() should fetch features with parameters', async function() {
  mockRequest(
    'https://service.com/collections/test/items?f=json&bbox=1%252C2%252C3%252C4&limit=1',
    {
      type: 'FeatureCollection',
      features: [],
    }
  );

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getFeatures('test', {
    bbox: [1, 2, 3, 4],
    limit: 1,
  });
  expect(result).toEqual({
    type: 'FeatureCollection',
    features: [],
  });
});

test('getFeature() should fetch a feature', async function() {
  mockRequest('https://service.com/collections/test/items/a?f=json', {
    type: 'Feature',
    geometry: {},
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getFeature('test', 'a');
  expect(result).toEqual({
    type: 'Feature',
    geometry: {},
  });
});