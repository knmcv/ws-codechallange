// products page for Karthik Coding Challenge  Williams Sonoma 
import WSIProdStore from './products.store.js';
import WSIProductsVM from './products.vue.js';
import OverlayCarousel from
    '../node_modules/image-gallery-overlay/build/js/carousel.js';
let carousel;

const JSON_FILE_NAME = 'wsi-products.json';
const PRODUCTS_URL = productsJsonUrl(JSON_FILE_NAME);
const prodStore = new WSIProdStore(PRODUCTS_URL);
const prodVM = WSIProductsVM('productsvm');

// form the URL to the products json file
// assumption: json file is stored in same path as web page
function productsJsonUrl (fileName) {
  const pathMinusFile = location.pathname.substring(0,
    location.pathname.lastIndexOf('/'));
  return `${location.protocol}//${location.hostname}:${location.port}` +
    `${pathMinusFile}/${fileName}`;
}

// display overlay carousel when product image is clicked
function handleProductClick (evt) {
  const isProductImage = (el) =>
    el.tagName === 'IMG' && typeof el.dataset.id !== 'undefined';
  const target = evt.target;
  if (isProductImage(target) === false) {
    return;
  }
  const thisProduct = prodStore.getProduct(target.dataset.id);
  const imgHrefs = thisProduct.images.map((image) => image.href);
  carousel.populate(thisProduct.name, imgHrefs)
    .then(() => {
      carousel.show();
    });
}

// add all products in prodstore to Vue model
function addProdStoreToVM () {
  prodStore.productIds().forEach((id) => {
    prodVM.addProduct(prodStore.getVueProduct(id));
  });
}

// accessibility: listen for 'enter' key events on images and convert
// to click
function mapEnterKeysToClickEvent (cardsParent) {
  cardsParent.addEventListener('keydown', (e) => {
    const elem = e.target;
    if (e.key === 'Enter' && elem.tagName === 'IMG') {
      elem.click();
    }
  });
}

// in order to detect a click on any one of the card images
// add one event listener to the parent of the product cards
function addImageClickListener (cardsParent) {
  cardsParent.addEventListener('click', handleProductClick);
}

// respond to hiding of overlay modal
function addOverlayHideListener () {
  $('#carouselModal').on('hidden.bs.modal', () => {
    // no cleanup needed
  });
}

// listen for escape key, then de-focus an active image
function addEscapeKeyListener () {
  document.addEventListener('keydown', (evt) => {
    if (evt.key !== 'Escape') { return; }
    if ($('#carouselModal').is(':visible')) { return; }
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
}

// add all of our event listeners
function addEventListeners () {
  const cardsParent = document.getElementById('products-container');
  addImageClickListener(cardsParent);
  mapEnterKeysToClickEvent(cardsParent);
  addOverlayHideListener();
  addEscapeKeyListener();
}

// initialize the page
function pageInit () {

  addEventListeners();

  // read in products and add to Vue model
  prodStore.readProducts()
    .then(result => {
      if (result !== true) {
        throw 'unable to read products';
      }
      addProdStoreToVM();
    })
    .catch(err => alert(err)); // TODO replace alert with modal dialog
}

function initPageOnWindowLoad () {
  window.addEventListener('load', () => {
    // install the overlay carousel
    carousel = new OverlayCarousel({
      thumbnailHoverOutline: '2px solid dodgerblue'
    });

    pageInit();
  });
}

initPageOnWindowLoad();

export default pageInit;
