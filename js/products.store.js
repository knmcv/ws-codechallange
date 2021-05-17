/**
 * products store for Karthik Coding Challenge  Williams Sonoma 
 * @param url
 * @return {{readProducts: (function(): Promise<boolean>), getVueProduct: (function(*): {heroHref: *, name: *, id: *}), getProduct: (function(*): *), productIds: (function(): string[])}}
 * @constructor
 */
function WSIProdStore (url) {

  let products;
  let jsonURL = url;

  // to enable effient access to a product by id,
  // reduce `productsRaw.groups` array
  // to object with property names of `id`
  const groupsToObject = (obj, group) => {
    obj[group.id] = group;
    return obj;
  };

  // fetch a JSON file and convert to object
  function fetchJSON (fileURL) {
    // console.log(`fetchJSON("${fileURL}")`);
    const fetchOptions = { method: 'GET' };
    return fetch(fileURL, fetchOptions)
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.error('fetchJSON fetch err:', err);
        throw err;
      });
  }

  /**
   * read products from JSON file
   * @return {Promise<boolean>} - true upon success
   */
  function readProducts () {
    return fetchJSON(jsonURL)
      .then(rawData => {
        products = rawData.groups.reduce(groupsToObject, {});
        // console.log('readProducts products:', products);
        return true;
      })
      .catch(err => {
        console.error('readProducts err:', err);
        return false;
      })
  }

  /**
   * return array of product ids
   * @return {string[]}
   */
  function productIds () {
    return Object.keys(products);
  }

  /**
   * return a single product from store
   * @param productId
   * @return {Object}
   */
  function getProduct (productId) {
    return products[productId];
  }

  /**
   * return product object to be consumed by Vue
   * @param productId
   * @return {{heroHref: *, name: *, id: *}}
   */
  function getVueProduct (productId) {
    const product = products[productId];
    if (typeof product === 'undefined') {
      return undefined;
    }
    const vueProduct = {
      id: product.id,
      name: product.name,
      heroHref: product.hero.href
    };
    if (product.priceRange) {
      vueProduct.priceRange = product.priceRange;
    } else if (product.price) {
      vueProduct.price = product.price;
    }
    return vueProduct;
  }

  return {
    readProducts,
    productIds,
    getProduct,
    getVueProduct
  }
}

export default WSIProdStore;
