/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/products.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/products.js":
/*!************************!*\
  !*** ./js/products.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _products_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products.store.js */ "./js/products.store.js");
/* harmony import */ var _products_vue_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./products.vue.js */ "./js/products.vue.js");
/* harmony import */ var _node_modules_image_gallery_overlay_build_js_carousel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/image-gallery-overlay/build/js/carousel.js */ "./node_modules/image-gallery-overlay/build/js/carousel.js");
// products page for Karthik Coding Challenge  Williams Sonoma 



var carousel;
var JSON_FILE_NAME = 'wsi-products.json';
var PRODUCTS_URL = productsJsonUrl(JSON_FILE_NAME);
var prodStore = new _products_store_js__WEBPACK_IMPORTED_MODULE_0__["default"](PRODUCTS_URL);
var prodVM = Object(_products_vue_js__WEBPACK_IMPORTED_MODULE_1__["default"])('productsvm'); // forn the URL to the products json file
// assumption: json file is stored in same path as web page

function productsJsonUrl(fileName) {
  var pathMinusFile = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
  return "".concat(location.protocol, "//").concat(location.hostname, ":").concat(location.port) + "".concat(pathMinusFile, "/").concat(fileName);
} // display overlay carousel when product image is clicked


function handleProductClick(evt) {
  var isProductImage = function isProductImage(el) {
    return el.tagName === 'IMG' && typeof el.dataset.id !== 'undefined';
  };

  var target = evt.target;

  if (isProductImage(target) === false) {
    return;
  }

  var thisProduct = prodStore.getProduct(target.dataset.id);
  var imgHrefs = thisProduct.images.map(function (image) {
    return image.href;
  });
  carousel.populate(thisProduct.name, imgHrefs).then(function () {
    carousel.show();
  });
} // add all products in prodstore to Vue model


function addProdStoreToVM() {
  prodStore.productIds().forEach(function (id) {
    prodVM.addProduct(prodStore.getVueProduct(id));
  });
} // accessibility: listen for 'enter' key events on images and convert
// to click


function mapEnterKeysToClickEvent(cardsParent) {
  cardsParent.addEventListener('keydown', function (e) {
    var elem = e.target;

    if (e.key === 'Enter' && elem.tagName === 'IMG') {
      elem.click();
    }
  });
} // in order to detect a click on any one of the card images
// add one event listener to the parent of the product cards


function addImageClickListener(cardsParent) {
  cardsParent.addEventListener('click', handleProductClick);
} // respond to hiding of overlay modal


function addOverlayHideListener() {
  $('#carouselModal').on('hidden.bs.modal', function () {// no cleanup needed
  });
} // listen for escape key, then de-focus an active image


function addEscapeKeyListener() {
  document.addEventListener('keydown', function (evt) {
    if (evt.key !== 'Escape') {
      return;
    }

    if ($('#carouselModal').is(':visible')) {
      return;
    }

    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
} // add all of our event listeners


function addEventListeners() {
  var cardsParent = document.getElementById('products-container');
  addImageClickListener(cardsParent);
  mapEnterKeysToClickEvent(cardsParent);
  addOverlayHideListener();
  addEscapeKeyListener();
} // initialize the page


function pageInit() {
  addEventListeners(); // read in products and add to Vue model

  prodStore.readProducts().then(function (result) {
    if (result !== true) {
      throw 'unable to read products';
    }

    addProdStoreToVM();
  }).catch(function (err) {
    return alert(err);
  }); // TODO replace alert with modal dialog
}

function initPageOnWindowLoad() {
  window.addEventListener('load', function () {
    // install the overlay carousel
    carousel = new _node_modules_image_gallery_overlay_build_js_carousel_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      thumbnailHoverOutline: '2px solid dodgerblue'
    });
    pageInit();
  });
}

initPageOnWindowLoad();
/* harmony default export */ __webpack_exports__["default"] = (pageInit);

/***/ }),

/***/ "./js/products.store.js":
/*!******************************!*\
  !*** ./js/products.store.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * products store for Karthik Coding Challenge  Williams Sonoma 
 * @param url
 * @return {{readProducts: (function(): Promise<boolean>), getVueProduct: (function(*): {heroHref: *, name: *, id: *}), getProduct: (function(*): *), productIds: (function(): string[])}}
 * @constructor
 */
function WSIProdStore(url) {
  var products;
  var jsonURL = url; // to enable effient access to a product by id,
  // reduce `productsRaw.groups` array
  // to object with property names of `id`

  var groupsToObject = function groupsToObject(obj, group) {
    obj[group.id] = group;
    return obj;
  }; // fetch a JSON file and convert to object


  function fetchJSON(fileURL) {
    // console.log(`fetchJSON("${fileURL}")`);
    var fetchOptions = {
      method: 'GET'
    };
    return fetch(fileURL, fetchOptions).then(function (response) {
      return response.json();
    }).catch(function (err) {
      console.error('fetchJSON fetch err:', err);
      throw err;
    });
  }
  /**
   * read products from JSON file
   * @return {Promise<boolean>}
   */


  function readProducts() {
    return fetchJSON(jsonURL).then(function (rawData) {
      products = rawData.groups.reduce(groupsToObject, {}); // console.log('readProducts products:', products);

      return true;
    }).catch(function (err) {
      console.error('readProducts err:', err);
      return false;
    });
  }
  /**
   * return array of product ids
   * @return {string[]}
   */


  function productIds() {
    return Object.keys(products);
  }
  /**
   * return a single product from store
   * @param productId
   * @return {Object}
   */


  function getProduct(productId) {
    return products[productId];
  }
  /**
   * return product object to be consumed by Vue
   * @param productId
   * @return {{heroHref: *, name: *, id: *}}
   */


  function getVueProduct(productId) {
    var product = products[productId];

    if (typeof product === 'undefined') {
      return undefined;
    }

    var vueProduct = {
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
    readProducts: readProducts,
    productIds: productIds,
    getProduct: getProduct,
    getVueProduct: getVueProduct
  };
}

/* harmony default export */ __webpack_exports__["default"] = (WSIProdStore);

/***/ }),

/***/ "./js/products.vue.js":
/*!****************************!*\
  !*** ./js/products.vue.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Vue app for displaying products in cards on page
 * @param {string} vmID - id of wrapper DOM element for vue model
 * @return {*}
 */
function WSIProductsVM(vmID) {
  var priceLabel = {
    regularPrice: 'Regular Price ',
    salePrice: 'Sale Price ',
    notOnSale: 'Price ',
    currencySymbol: '$'
  };
  Vue.component('product-img', {
    props: ['product'],
    template: "\n      <img\n        v-bind:src=\"product.heroHref\"\n        v-bind:data-id=\"product.id\"\n        v-bind:alt=\"product.name\"\n        class=\"card-img-top\"\n        role=\"button\"\n        tabindex=\"0\"\n      >"
  });
  Vue.component('product-name', {
    props: ['name'],
    template: "\n      <p class=\"card-text\" v-html=\"name\"></p>"
  });
  Vue.component('product-pricing', {
    props: ['displayprice'],
    template: "\n      <p class=\"card-text\" v-html=\"displayprice\"></p>"
  });
  return new Vue({
    el: "#".concat(vmID),
    data: {
      products: []
    },
    methods: {
      addProduct: function addProduct(product) {
        this.products.push(product);
        return this.products.length;
      },
      displayPrice: function displayPrice(product) {
        var _ref = product.priceRange ? [product.priceRange.regular, product.priceRange.selling] : [product.price.regular, product.price.selling],
            _ref2 = _slicedToArray(_ref, 2),
            regular = _ref2[0],
            selling = _ref2[1];

        var isOnSale = function isOnSale(reg, sale) {
          return typeof reg === 'number' ? reg !== sale : reg.low !== sale.low || reg.high !== sale.high;
        };

        var priceString = function priceString(price) {
          return typeof price === 'number' ? "".concat(priceLabel.currencySymbol).concat(price) : "".concat(priceLabel.currencySymbol).concat(price.low, " - $").concat(price.high);
        };

        if (isOnSale(regular, selling)) {
          return "<span class=\"wsi-price\">".concat(priceLabel.regularPrice, "\n            ").concat(priceString(regular), "</span><br/>\n            <span class=\"wsi-price wsi-sale\">").concat(priceLabel.salePrice, "\n            ").concat(priceString(selling), "</span>");
        } else {
          return "<span class=\"wsi-price\">".concat(priceLabel.notOnSale, "\n            ").concat(priceString(regular), "</span>");
        }
      }
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (WSIProductsVM);

/***/ }),

/***/ "./node_modules/image-gallery-overlay/build/js/CSSEditableProps.js":
/*!*************************************************************************!*\
  !*** ./node_modules/image-gallery-overlay/build/js/CSSEditableProps.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// editable css props for carousel modal
var CSSEditableProps = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  headerPadding: '0.25rem 1rem',
  headerParagraphMargin: '0',
  footerPadding: '0 1rem',
  thumbnailBtnPadding: '0',
  thumbnailBtnMargin: '0 4px',

  /* must be in 'px' units */
  thumbnailImgHeight: '60px',
  thumbnailImgHoverFilter: 'brightness(70%) contrast(150%)',
  thumbnailBorder: 'none',
  thumbnailSelectedOpacity: '60%',
  thumbnailSelectedFilter: 'grayscale(100%) brightness(110%) blur(1px)'
};
/* harmony default export */ __webpack_exports__["default"] = (CSSEditableProps);

/***/ }),

/***/ "./node_modules/image-gallery-overlay/build/js/CSSTemplate.js":
/*!********************************************************************!*\
  !*** ./node_modules/image-gallery-overlay/build/js/CSSTemplate.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// css template for carousel modal
var CSSTemplate = "\n    /* general */\n    #carousel-modal-container {\n      font-family: {{fontFamily}};\n    }\n\n    /* .cmodal */\n    #carousel-modal-container .cmodal {\n      position: fixed;\n      top: 0;\n      left: 0;\n      z-index: 1050;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      outline: 0;\n      pointer-events: none;\n    }\n    .cmodal-open #carousel-modal-container .cmodal {\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n    \n    /* .cmodal-dialog */\n    #carousel-modal-container .cmodal .cmodal-dialog {\n      position: relative;\n      width: auto;\n      margin: 0 auto;\n      pointer-events: none;\n      display: flex;\n      align-items: center;\n      min-height: calc(100% - 1rem);\n      opacity: 0;\n      transition: opacity .75s ease;\n    }\n    #carousel-modal-container .cmodal.show .cmodal-dialog {\n     opacity: 1;\n    }\n    @media (max-width: 475px) {\n      #carousel-modal-container .cmodal.show .cmodal-dialog {\n        max-width: 92vw !important;\n      }\n    }\n    \n    /* .cmodal-content */\n    #carousel-modal-container .cmodal-content {\n      position: relative;\n      display: flex;\n      flex-direction: column;\n      width: 100%;\n      pointer-events: auto;\n      background-color: #fff;\n      background-clip: padding-box;\n      border: 1px solid rgba(0,0,0,.2);\n      border-radius: 0.3rem;\n      outline: 0;\n    }\n    \n    /* .cmodal-header */\n    #carousel-modal-container .cmodal-header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      padding: {{headerPadding}};\n      border-bottom: 1px solid #dee2e6;\n      border-top-left-radius: calc(.3rem - 1px);\n      border-top-right-radius: calc(.3rem - 1px);\n    }\n    #carousel-modal-container .cmodal-header p {\n      margin: {{headerParagraphMargin}};\n    }\n    \n    /* .cmodal-body */\n    #carousel-modal-container .cmodal-body {\n      position: relative;\n      flex: 1 1 auto;\n      padding: 1rem;\n    }\n    \n    /* carousel */\n    #carousel-modal-container .carousel-container {\n      margin: 0;\n      position: relative;\n      width: 100%;\n     }\n     #carousel-modal-container .carousel-overlay-div {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: white;\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 0.1s;\n     }\n     #carousel-modal-container .carousel-hero {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: auto;\n     }\n     #carousel-modal-container .carousel-overlay {\n       position: absolute;\n       top: 0;\n       left: 0;\n       width: 100%;\n       height: auto;\n     }\n     #carousel-modal-container .carousel-fade-in {\n       opacity: 1;\n       transition: opacity .75s ease;\n     }\n    \n    /* cmodal-footer */\n    #carousel-modal-container .cmodal-footer {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      justify-content: flex-end;\n      padding: {{footerPadding}};\n      border-top: 1px solid #dee2e6;\n      border-bottom-right-radius: calc(.3rem - 1px);\n      border-bottom-left-radius: calc(.3rem - 1px);\n    }\n    #carousel-modal-container .div-thumbnails {\n      overflow-x: auto;\n      white-space: nowrap;\n      margin: 0;\n      padding: 8px 16px 12px 16px; /* padding must be 'px' */\n      background-color: transparent;\n      scroll-behavior: smooth;\n    }\n    #carousel-modal-container .div-thumbnails button {\n      padding: {{thumbnailBtnPadding}};\n      margin: {{thumbnailBtnMargin}};\n      background-color: transparent;\n      border: none;\n    }\n    #carousel-modal-container .div-thumbnails button:focus {\n      outline: 2px solid #aaa;\n      outline-offset: 2px;\n    }\n    #carousel-modal-container .div-thumbnails img {\n      height: {{thumbnailImgHeight}};\n      width: auto;\n      margin: 0;\n      border: {{thumbnailBorder}};\n    }\n    #carousel-modal-container .div-thumbnails img:hover {\n      filter: {{thumbnailImgHoverFilter}};\n    }\n    #carousel-modal-container .div-thumbnails img.selected {\n      cursor: default;\n      opacity: {{thumbnailSelectedOpacity}};\n      filter: {{thumbnailSelectedFilter}};\n    }\n    \n    /* close button */\n    #carousel-modal-container button.close {\n      float: right;\n      font-size: 1.5rem;\n      font-weight: 700;\n      line-height: 1;\n      color: #000;\n      text-shadow: 0 1px 0 #fff;\n      padding: 1rem;\n      margin: -1rem -1rem -1rem auto;;\n      background-color: transparent;\n      border: 0;\n      opacity: .5;\n    }\n    #carousel-modal-container button.close:hover {\n      opacity: .8;\n    }\n    \n    /* cmodal-backdrop */\n    .cmodal-backdrop {\n      position: fixed;\n      top: 0;\n      left: 0;\n      z-index: 1040;\n      width: 100vw;\n      height: 100vh;\n      background-color: #000;\n      transition: opacity .3s ease;\n      opacity: 0;\n    }\n    .cmodal-backdrop.show {\n      opacity: 0.5;\n    }\n    \n    /* .cmodal-open */ \n    .cmodal-open {\n      overflow: hidden;\n    }\n    \n    cmodal-open cmodal {\n      overflow-x: hidden;\n      overflow-y: auto;\n    }\n";
/* harmony default export */ __webpack_exports__["default"] = (CSSTemplate);

/***/ }),

/***/ "./node_modules/image-gallery-overlay/build/js/HTMLTemplate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/image-gallery-overlay/build/js/HTMLTemplate.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// HTML template for carousel modal - a Bootstrap modal with an image carousel
var HTMLTemplate = "\n  <div\n    tabindex=\"-1\"\n    class=\"cmodal\"\n    data-wrap=\"false\"\n    style=\"display: none\"\n  >\n    <div\n      class=\"cmodal-dialog cmodal-dialog-centered\"\n      style=\"max-width: calc(-2rem + 58vh)\"\n    >\n      <div class=\"cmodal-content\">\n      \n        <div class=\"cmodal-header\">\n          <p><!-- name of product --></p>\n          <button type=\"button\"\n            aria-label=\"Close\"\n            class=\"close\"\n          >\n            <span aria-hidden=\"true\">\xD7</span>\n          </button>\n        </div> <!-- /.cmodal-header -->\n        \n        <div class=\"cmodal-body\">\n          <div\n            class=\"carousel-container\"\n            data-aspect-ratio=\"0.6666667\"\n            style=\"padding-bottom: 150%\"\n          >\n            <img\n              class=\"carousel-hero\"\n              src=\"\"\n              alt=\"carousel hero\">\n            <!-- .carousel-overlay-div -->\n            <div\n              class=\"carousel-overlay-div\"\n            >\n              <img\n                class=\"carousel-overlay\"\n                alt=\"carousel overlay\"\n                src=\"\"\n              >\n            </div> <!-- /.carousel-overlay-div -->\n          </div> <!-- /.carousel-container -->\n        </div> <!-- /.cmodal-body -->\n\n        <div class=\"cmodal-footer\">\n          <div class=\"div-thumbnails\"></div>\n        </div> <!-- /.cmodal-footer -->\n        \n      </div> <!-- /.cmodal-content -->\n    </div> <!-- /.cmodal-dialog -->\n  </div> <!-- /.cmodal -->\n  <div class=\"cmodal-backdrop\" style=\"display: none\"></div>\n";
/* harmony default export */ __webpack_exports__["default"] = (HTMLTemplate);

/***/ }),

/***/ "./node_modules/image-gallery-overlay/build/js/carousel.js":
/*!*****************************************************************!*\
  !*** ./node_modules/image-gallery-overlay/build/js/carousel.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CSSTemplate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSTemplate.js */ "./node_modules/image-gallery-overlay/build/js/CSSTemplate.js");
/* harmony import */ var _CSSEditableProps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSEditableProps.js */ "./node_modules/image-gallery-overlay/build/js/CSSEditableProps.js");
/* harmony import */ var _HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLTemplate.js */ "./node_modules/image-gallery-overlay/build/js/HTMLTemplate.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// image gallery carousel overlay with thumbnails




function OverlayCarousel(userEditsToCSSProps) {
  // work on duplicates of the templates
  var editableCSSProps = _objectSpread({}, _CSSEditableProps_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

  var cssContent = _CSSTemplate_js__WEBPACK_IMPORTED_MODULE_0__["default"].slice(0); // handy reference to our created HTML elements
  // set with _htmlElementReferences()

  var htmlRefs = {};
  var _modalIsShowing = false; // state of the div + image that overlays the hero image
  // to perform cross-fading

  function _initOverlayState() {
    return {
      inTransition: false,
      imgSrc: "",
      imgAlt: "",
      imgTitle: "",
      imgIndex: null,
      timeoutID: null
    };
  }

  var _overlayState = _initOverlayState(); // state of the thumbnails


  function _initThumbnailsState() {
    return {
      imgs: [],
      firstThumbnailImg: null,
      firstThumbnailBtn: null,
      lastThumbnailImg: null,
      lastTumbnailBtn: null,
      selectedThumbnailImg: null
    };
  }

  var _thumbnailsState = _initThumbnailsState(); // true if element (and browser) support smooth scrolling


  var _hasSmoothScrolling = function _hasSmoothScrolling(el) {
    return getComputedStyle(el).scrollBehavior === 'smooth';
  }; // apply user edits to editable css props


  function _applyUserEditsToCSSProps(edits) {
    if (typeof edits === 'undefined') {
      return;
    }

    for (var _i = 0, _Object$entries = Object.entries(edits); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          propName = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (typeof editableCSSProps[propName] === 'undefined') {
        continue;
      }

      editableCSSProps[propName] = value;
    }
  } // apply all css props to cssContent


  function _applyCSSPropsToCSSContent(props) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(props); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          propName = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      var searchStr = "{{".concat(propName, "}}");
      var subStr = "".concat(value);
      cssContent = cssContent.replace(searchStr, subStr);
    }
  } // create style sheet HTML element with `textContent`


  function _createStyleSheetElement(textContent) {
    var style = document.createElement('style');
    style.textContent = textContent;
    return style;
  } // create carousel-modal-container div


  function _createCarouselModalContainer(innerHTML) {
    var div = document.createElement('div');
    div.id = "carousel-modal-container";
    div.innerHTML = innerHTML;
    return div;
  } // references to our significant HTML elements


  function _htmlElementReferences(galleryOverlay) {
    var shadowRoot = galleryOverlay.shadowRoot,
        cModalContainer = shadowRoot.getElementById('carousel-modal-container'),
        cModal = cModalContainer.querySelector('.cmodal'),
        cmBackdrop = cModalContainer.querySelector('.cmodal-backdrop'),
        cmDialog = cModal.querySelector('.cmodal-dialog'),
        cmContent = cmDialog.querySelector('.cmodal-content'),
        cmHeader = cmDialog.querySelector('.cmodal-header'),
        cmHeaderP = cmHeader.querySelector('p'),
        closeBtn = cmHeader.querySelector('button.close'),
        cmBody = cmDialog.querySelector('.cmodal-body'),
        carouselContainer = cmBody.querySelector('.carousel-container'),
        heroImg = carouselContainer.querySelector('.carousel-hero'),
        overlayDiv = carouselContainer.querySelector('.carousel-overlay-div'),
        overlayImg = overlayDiv.querySelector('.carousel-overlay'),
        cmFooter = cmDialog.querySelector('.cmodal-footer'),
        thumbnailsDiv = cmFooter.querySelector('.div-thumbnails');
    return {
      shadowRoot: shadowRoot,
      cModalContainer: cModalContainer,
      cModal: cModal,
      cmBackdrop: cmBackdrop,
      cmDialog: cmDialog,
      cmContent: cmContent,
      cmHeader: cmHeader,
      cmHeaderP: cmHeaderP,
      closeBtn: closeBtn,
      cmBody: cmBody,
      carouselContainer: carouselContainer,
      heroImg: heroImg,
      overlayDiv: overlayDiv,
      overlayImg: overlayImg,
      cmFooter: cmFooter,
      thumbnailsDiv: thumbnailsDiv
    };
  } // <gallery-overlay> custom element


  var GalleryOverlay = /*#__PURE__*/function (_HTMLElement) {
    _inherits(GalleryOverlay, _HTMLElement);

    var _super = _createSuper(GalleryOverlay);

    function GalleryOverlay() {
      var _this;

      _classCallCheck(this, GalleryOverlay);

      _this = _super.call(this); // append shadow root

      _this.attachShadow({
        mode: 'open'
      }); // append style element to the shadow DOM


      _this.shadowRoot.append(_createStyleSheetElement(cssContent)); // append carousel modal container and its contents to shadow DOM


      _this.shadowRoot.append(_createCarouselModalContainer(_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_2__["default"]));

      return _this;
    }

    return GalleryOverlay;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  function _createGalleryOverlay() {
    // console.log('_createGalleryOverlay()');
    customElements.define('gallery-overlay', GalleryOverlay);
    return document.createElement('gallery-overlay');
  }

  function _appendGalleryOverlayToBody(galleryOverlay) {
    document.body.appendChild(galleryOverlay);
  }
  /**
   * select thumbnail and display as hero image
   * @param {HTMLImageElement} thumbnailImg
   * @param {boolean} animate - animate the hero image transition
   */


  function _selectAndDisplayImage(thumbnailImg) {
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    // console.log(`_selectAndDisplayImage()`);
    // deselect current thumbnail and select new one
    if (_thumbnailsState.selectedThumbnailImg) {
      _thumbnailsState.selectedThumbnailImg.classList.remove('selected');
    }

    _thumbnailsState.selectedThumbnailImg = thumbnailImg;
    thumbnailImg.classList.add('selected'); // scroll to the selected thumbnail

    _scrollThumbnailsViewport(); // clear existing overlay timeout, if one exists


    if (_overlayState.timeoutID !== null) {
      // console.log('    clearing prior timeout');
      clearTimeout(_overlayState.timeoutID);
      _overlayState.timeoutID = null;
    } // set overlay state for the selected image


    Object.assign(_overlayState, {
      imgSrc: thumbnailImg.src,
      imgAlt: thumbnailImg.alt,
      imgTitle: thumbnailImg.title,
      imgIndex: Number(thumbnailImg.dataset.index)
    }); // change the fade-in overlay image

    htmlRefs.overlayImg.src = _overlayState.imgSrc;

    if (animate === false) {
      // clean up without animation
      _completeImageFade();

      return;
    } // with animation: fade in overlay image
    // console.log('_selectAndDisplayImage fading in overlay');


    _overlayState.inTransition = true;
    htmlRefs.overlayDiv.classList.add('carousel-fade-in'); // add timeout in case 'transitionend' event is never received

    var thisIndex = _overlayState.imgIndex;
    _overlayState.timeoutID = setTimeout(function () {
      if (_overlayState.inTransition === false) {
        return;
      }

      if (_overlayState.imgIndex !== thisIndex) {
        return;
      } // console.log(`transitionend timeout for index ${thisIndex}, call _completeImageFade()`);


      _completeImageFade();
    }, 1500);
  } // clean up display elements after image fade transition completes


  function _completeImageFade() {
    // console.log('_completeImageFade() _overlayState.inTransition:', _overlayState.inTransition);
    _overlayState.inTransition = false; // update hero image

    if (_overlayState.imgSrc && _overlayState.imgSrc.length > 0) {
      Object.assign(htmlRefs.heroImg, {
        src: _overlayState.imgSrc,
        alt: _overlayState.imgAlt,
        title: _overlayState.imgTitle
      });
    } // reset overlay state


    Object.assign(_overlayState, _initOverlayState()); // clean up overlay

    if (_overlayState.inTransition) {
      return;
    }

    htmlRefs.overlayDiv.classList.remove('carousel-fade-in');
  } // upon enter keydown over thumbnail button, dispatch click on thumbnail image


  function _listenForEnterKeyOverButton() {
    var handleEnterKey = function handleEnterKey(e) {
      if (e.key !== 'Enter') {
        return;
      }

      var elem = e.target;

      if (elem.tagName !== 'BUTTON') {
        return;
      }

      var btnImg = elem.firstChild;

      if (!btnImg || btnImg.tagName !== 'IMG') {
        return;
      }

      btnImg.click();
    };

    htmlRefs.thumbnailsDiv.addEventListener('keydown', handleEnterKey);
  } // respond to clicks on thumbnail images


  function _listenForThumbnailImageClicks() {
    var handleClick = function handleClick(evt) {
      var elClicked = evt.target;

      var isThumbnailImg = function isThumbnailImg(el) {
        return el.tagName === 'IMG' && typeof el.dataset.index !== 'undefined';
      };

      if (isThumbnailImg(elClicked) === false) {
        return;
      }

      _selectAndDisplayImage(elClicked);
    };

    htmlRefs.thumbnailsDiv.addEventListener('click', handleClick);
  } // listen for overlay fade completion


  function _listenForImageOverlayFade() {
    htmlRefs.overlayDiv.addEventListener('transitionend', _completeImageFade);
  } // listen for tab key to keep focus on gallery overlay elements


  function _handleTab(evt) {
    if (evt.key !== 'Tab') {
      return;
    }

    var isShiftTab = evt.shiftKey === true;
    var elWithFocus = htmlRefs.shadowRoot.activeElement;
    var lastThumbnailHasFocus = elWithFocus === _thumbnailsState.lastThumbnailBtn;
    var tabbingFromLastThumbnail = lastThumbnailHasFocus && !isShiftTab;
    var closeBtnHasFocus = elWithFocus === htmlRefs.closeBtn;
    var shiftTabbingFromCloseBtn = closeBtnHasFocus && isShiftTab; // handle tab and shift-tab from any non-gallery element

    if (elWithFocus === null) {
      evt.preventDefault();

      if (isShiftTab) {
        _thumbnailsState.lastThumbnailBtn.focus();
      } else {
        htmlRefs.closeBtn.focus();
      }

      return;
    } // blur when tabbing off the ends of tabbable element list


    if (tabbingFromLastThumbnail || shiftTabbingFromCloseBtn) {
      evt.preventDefault();
      elWithFocus.blur();
    }
  }

  function _listenForTabKey() {
    document.addEventListener('keydown', _handleTab);
  }

  function _removeTabKeyListener() {
    document.removeEventListener('keydown', _handleTab);
  } // hide everything


  function _hideModal() {
    // console.log('_hideModal()');
    if (_modalIsShowing === false) {
      return;
    }

    _modalIsShowing = false;

    _removeTabKeyListener();

    htmlRefs.cmBackdrop.addEventListener('transitionend', function () {
      htmlRefs.cmBackdrop.style.display = 'none';
    }, {
      once: true
    });
    htmlRefs.cModal.addEventListener('transitionend', function () {
      htmlRefs.cModal.style.display = 'none';
    }, {
      once: true
    });
    htmlRefs.cmBackdrop.classList.remove('show');
    htmlRefs.cModal.classList.remove('show');
    document.body.classList.remove('cmodal-open');
  } // respond to events intended to hide modal


  function _listenForHideModalEvents() {
    // a click on modal close button
    htmlRefs.closeBtn.addEventListener('click', _hideModal); // a click on modal backdrop

    htmlRefs.cmBackdrop.addEventListener('click', _hideModal); // ESC key pressed anywhere

    document.addEventListener('keyup', function (evt) {
      if (evt.key === 'Escape') {
        // console.log('ESC key pressed');
        _hideModal();
      }
    });
  } // scroll viewport using vanilla JavaScript
  // (for browsers like Safari that don't natively support smooth scrolling)


  function _vpScrollJavaScript(scrollDest) {
    // simulate scroll feature with vanilla JavaScript
    var timeStep = 20;
    var timeTotal = 400;
    var stepsTotal = Math.round(timeTotal / timeStep);
    var scrollStart = htmlRefs.thumbnailsDiv.scrollLeft;
    var scrollTotal = scrollDest - scrollStart;
    var scrollStep = Math.round(scrollTotal / stepsTotal);
    var time = timeStep,
        scroll = scrollStart + scrollStep;

    var _scrollRecursive = function _scrollRecursive() {
      if (time >= timeTotal) {
        htmlRefs.thumbnailsDiv.scrollLeft = scrollDest;
        return;
      }

      htmlRefs.thumbnailsDiv.scrollLeft = scroll;
      time += timeStep;
      scroll += scrollStep;
      setTimeout(_scrollRecursive, timeStep);
    };

    if (scrollTotal === 0) {
      return;
    }

    _scrollRecursive();
  }
  /**
   * scroll thumbnails viewport to show currently selected thumbnail
   * in center
   */


  function _scrollThumbnailsViewport() {
    var thumbnailImg = _thumbnailsState.selectedThumbnailImg;

    if (!thumbnailImg) {
      return;
    }

    var vpScrollWidth = htmlRefs.thumbnailsDiv.scrollWidth;
    var vpStyle = getComputedStyle(htmlRefs.thumbnailsDiv);
    var vpPaddingLeft = parseFloat(vpStyle.paddingLeft);
    var vpWindowWidth = htmlRefs.thumbnailsDiv.clientWidth;
    var vpScrollMax = vpScrollWidth - vpWindowWidth;
    var tnButton = thumbnailImg.parentElement;
    var tnButtonStyle = getComputedStyle(tnButton);
    var tnButtonWidth = tnButton.offsetWidth + parseFloat(tnButtonStyle.marginLeft) + parseFloat(tnButtonStyle.marginRight);
    var tnOffsetCenter = tnButton.offsetLeft + tnButton.offsetWidth / 2; // scroll to position thumbnail in center of viewport window

    var newScrollLeft = tnOffsetCenter - Math.round((vpWindowWidth + tnButtonWidth) / 2) + vpPaddingLeft;

    if (newScrollLeft < 0) {
      newScrollLeft = 0;
    }

    if (newScrollLeft > vpScrollMax) {
      newScrollLeft = vpScrollMax;
    }

    if (_hasSmoothScrolling(htmlRefs.thumbnailsDiv)) {
      // console.log('scrolling with Element.scrollLeft = newScrollLeft');
      htmlRefs.thumbnailsDiv.scrollLeft = newScrollLeft;
    } else {
      _vpScrollJavaScript(newScrollLeft);
    } // give focus to the thumbnail button


    tnButton.focus();
  }

  function _populateThumbnails(hrefs, titles, imgOnLoadHandler) {
    htmlRefs.thumbnailsDiv.innerHTML = '';
    Object.assign(_thumbnailsState, _initThumbnailsState());
    _thumbnailsState.imgs = hrefs.map(function (href, index) {
      var btnThumb = document.createElement('button');
      htmlRefs.thumbnailsDiv.appendChild(btnThumb);
      var imgThumb = document.createElement('img');
      imgThumb.onload = imgOnLoadHandler;
      imgThumb.dataset.index = String(index);
      imgThumb.src = href;

      if (titles !== null) {
        imgThumb.alt = imgThumb.title = titles[index];
      }

      btnThumb.appendChild(imgThumb);
      return imgThumb;
    });
    _thumbnailsState.firstThumbnailImg = _thumbnailsState.imgs[0];
    _thumbnailsState.firstThumbnailBtn = _thumbnailsState.firstThumbnailImg.parentElement;
    _thumbnailsState.lastThumbnailImg = _thumbnailsState.imgs[_thumbnailsState.imgs.length - 1];
    _thumbnailsState.lastThumbnailBtn = _thumbnailsState.lastThumbnailImg.parentElement; // display thumbnails only when there are multiple images

    var hasMultipleImages = hrefs.length > 1;
    htmlRefs.cmFooter.style.display = hasMultipleImages ? '' : 'none';
  }
  /**
   * populate overlay with name, hero and thumbnail images
   * @param name
   * @param hrefs
   * @param titles
   * @return {Promise<unknown>}
   */


  function populate(name, hrefs) {
    var titles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    // console.log(`populate()`);
    var hrefsCount = hrefs.length;
    var completed = false;
    return new Promise(function (resolve, reject) {
      // display the modal (invisibly) to obtain its dimensions
      var displaySave = htmlRefs.cModal.style.display;
      htmlRefs.cModal.style.display = 'block';
      htmlRefs.cmHeaderP.innerHTML = name;
      var imagesLoaded = 0;
      var aspectRatioMin = Infinity; // detect image aspect ratio when it receives a 'load' event

      function _evalLoadedImage() {
        var img = this;
        var imgAspectRatio = img.height > 0 ? img.width / img.height : null;
        imagesLoaded++;

        if (imgAspectRatio === null) {
          return;
        }

        img.dataset.aspectRatio = String(imgAspectRatio);
        aspectRatioMin = imgAspectRatio < aspectRatioMin ? imgAspectRatio : aspectRatioMin;

        if (imagesLoaded < hrefsCount) {
          return;
        }

        if (aspectRatioMin === Infinity) {
          return;
        } // all images loaded:
        // set padding-bottom of container to accommodate tallest image


        htmlRefs.carouselContainer.style.paddingBottom = Math.round(1.0 / aspectRatioMin * 100) + '%';
        htmlRefs.carouselContainer.dataset.aspectRatio = String(aspectRatioMin); // set the modal's max width to maintain its aspect ratio
        // while keeping the entire modal within the browser's viewport

        var modalAspectRatio = htmlRefs.cmContent.offsetWidth / htmlRefs.cmContent.offsetHeight;
        htmlRefs.cmDialog.style.maxWidth = "calc(-30px + ".concat(Math.round(modalAspectRatio * 100), "vh)"); // restore the modal's display state

        htmlRefs.cModal.style.display = displaySave; // all images loaded, mark as completed and resolve the promise

        completed = true;
        resolve();
      } // populate the thumbnails


      _populateThumbnails(hrefs, titles, _evalLoadedImage); // set a timeout in case some images don't load


      setTimeout(function () {
        if (completed) {
          return;
        } // reject with an error message


        var errmsg = "unable to load some images, expected ".concat(hrefsCount) + ", loaded ".concat(imagesLoaded);
        reject(errmsg);
      }, 2000);
    });
  } // show the image gallery


  function show() {
    // console.log('show()');
    if (_modalIsShowing) {
      return;
    } // make the display changes *before* showing the modal


    if (_thumbnailsState.firstThumbnailImg === null) {
      console.error('no thumbnail images found');
      return;
    }

    _selectAndDisplayImage(_thumbnailsState.firstThumbnailImg, false);

    htmlRefs.cmBackdrop.style.display = 'block';
    htmlRefs.cModal.style.display = 'block'; // listen for tab keys

    _listenForTabKey(); // delay showing slightly to avoid any UI flash


    setTimeout(function () {
      htmlRefs.cModal.classList.add('show');
      htmlRefs.cmBackdrop.classList.add('show');
      document.body.classList.add('cmodal-open');
      _modalIsShowing = true;
    }, 200);
  }

  function _init() {
    _applyUserEditsToCSSProps(userEditsToCSSProps);

    _applyCSSPropsToCSSContent(editableCSSProps);

    var galleryOverlay = _createGalleryOverlay();

    _appendGalleryOverlayToBody(galleryOverlay);

    Object.assign(htmlRefs, _htmlElementReferences(galleryOverlay));

    _listenForImageOverlayFade();

    _listenForThumbnailImageClicks();

    _listenForEnterKeyOverButton();

    _listenForHideModalEvents();
  } // initialize


  _init();

  return {
    populate: populate,
    show: show
  };
}

/* harmony default export */ __webpack_exports__["default"] = (OverlayCarousel);

/***/ })

/******/ });
//# sourceMappingURL=products.js.map