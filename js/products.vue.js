/**
 * Vue app for displaying products in cards on page
 * @param {string} vmID - id of wrapper DOM element for vue model
 * @return {*}
 */
function WSIProductsVM (vmID) {

  const priceLabel = {
    regularPrice: 'Regular Price ',
    salePrice: 'Sale Price ',
    notOnSale: 'Price ',
    currencySymbol: '$'
  };

  Vue.component('product-img', {
    props: ['product'],
    template: `
      <img
        v-bind:src="product.heroHref"
        v-bind:data-id="product.id"
        v-bind:alt="product.name"
        class="card-img-top"
        role="button"
        tabindex="0"
      >`
  });

  Vue.component('product-name', {
    props: ['name'],
    template: `
      <p class="card-text" v-html="name"></p>`
  });

  Vue.component('product-pricing', {
    props: ['displayprice'],
    template: `
      <p class="card-text" v-html="displayprice"></p>`
  })

  return new Vue({
    el: `#${vmID}`,
    data: {
      products: []
    },

    methods: {

      addProduct: function (product) {
        this.products.push(product);
        return this.products.length;
      },

      displayPrice: function (product) {

        const [regular, selling] = product.priceRange ?
          [product.priceRange.regular, product.priceRange.selling] :
          [product.price.regular, product.price.selling];

        const isOnSale = (reg, sale) => {
          return (typeof reg === 'number')
            ? reg !== sale
            : (reg.low !== sale.low || reg.high !== sale.high);
        };

        const priceString = (price) => {
          return (typeof price === 'number')
            ? `${priceLabel.currencySymbol}${price}`
            : `${priceLabel.currencySymbol}${price.low} - $${price.high}`;
        };

        if (isOnSale(regular, selling)) {
          return (
            `<span class="wsi-price">${priceLabel.regularPrice}
            ${priceString(regular)}</span><br/>
            <span class="wsi-price wsi-sale">${priceLabel.salePrice}
            ${priceString(selling)}</span>`
          );
        } else {
          return (
            `<span class="wsi-price">${priceLabel.notOnSale}
            ${priceString(regular)}</span>`
          );
        }
      }
    }
  });
}

export default WSIProductsVM;

