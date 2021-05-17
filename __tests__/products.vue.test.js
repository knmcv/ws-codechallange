// test of products.vue.js

import Vue from 'vue/dist/vue.js';
global.Vue = Vue;

import WSIProductsVM from '../js/products.vue.js';
import {
  addMockDomToDocument,
  mockVueProduct,
  mockVueProductExpectedPrice } from './products.mock';

addMockDomToDocument();
const oneVueProduct = mockVueProduct();

// did Vue import?
test(`import Vue from 'vue/dist/vue.js'`, () => {
  expect(Vue).toBeDefined();
});

// did WSIProductsVM mount?
test(`import WSIProductsVM from './products.vue'`, () => {
  expect(WSIProductsVM).toBeDefined();
});

// create instance of WSIProductsVM
const prodVM = WSIProductsVM('productsvm');
test('create instance of WSIProductsVM', () => {
  expect(prodVM).toBeDefined();
});

// add a product
test('add one product', () => {
  const productCount = prodVM.addProduct(oneVueProduct);
  expect(productCount).toBeGreaterThan(0);
});

// test displayPrice()
// expected result:
const trimWhitespace = (str) => str.replace(/\s\s+/g, ' ');
const expected = trimWhitespace(
  `<span class="wsi-price">Regular Price $45</span><br/>
  <span class="wsi-price wsi-sale">Sale Price $19.95</span>`
);
test('display price', () => {
  const result = prodVM.displayPrice(oneVueProduct);
  const resultTrimmed = trimWhitespace(result);
  const expected = mockVueProductExpectedPrice();
  expect(typeof result).toBe('string');
  expect(result.length).toBeGreaterThan(0);
  expect(resultTrimmed.localeCompare(expected)).toEqual(0);
});
