// test suite for products.store.js
import {
  mockFetchToProducts,
  unMockFetch } from './products.mock';
import WSIProdStore  from '../js/products.store';

test('import WSIProdStore from products.store.js', () => {
  expect(WSIProdStore).toBeDefined();
});

const jsonURL =
  'https://terrymorse.com/private/wsicodechallenge/wsi-products.json';
const prodStore = new WSIProdStore(jsonURL);
test('construct WSIProdStore instance', () => {
  expect(prodStore).toBeDefined();
});

test('WSIProdStore readProducts() returns true',() => {
  expect.assertions(1);
  mockFetchToProducts();
  return prodStore.readProducts()
    .then(result => {
      unMockFetch();
      expect(result).toBe(true);
    });
  });

test('WSIProdStore productIds() returns array of length 10', () => {
  const firstId = "organic-tassel-stripe-bath-mat-dark-horseradish-b3234";
  const ids = prodStore.productIds();
  expect(ids.length).toBe(10);
  expect(ids).toContain(firstId);
});

test('WSIProdStore getProduct() with bogus id returns undefined', () => {
  const product = prodStore.getProduct('bogus-id');
  expect(product).not.toBeDefined();
});

test('WSIProdStore getProduct() with valid id returns product', () => {
  const prodId = 'nomad-2-1-leather-2-seat-sofa-with-ottoman-61-h6668';
  const product = prodStore.getProduct(prodId);
  expect(product).toBeDefined();
  expect(product.id).toEqual(prodId);
  expect(product.name)
    .toEqual("Nomad Leather Loveseat with Ottoman (61&quot;)");
});

test('WSIProdStore getVueProduct() returns correct object', () => {
  const prodId = 'nomad-2-1-leather-2-seat-sofa-with-ottoman-61-h6668';
  const prodVue = prodStore.getVueProduct(prodId);
  expect(typeof prodVue).toEqual('object');
  expect(prodVue.id).toEqual(prodId);
  expect(prodVue.priceRange).not.toBeDefined();
  expect(prodVue.price).toBeDefined();
});

test('WSIProdStore getVueProduct() with bogus id returns undefined', () => {
  const prodVue = prodStore.getVueProduct('bogus-id');
  expect(prodVue).not.toBeDefined();
});



