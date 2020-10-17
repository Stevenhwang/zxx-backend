const product = require('../models/product');
const ProductType = product.ProductType

let getProductTypes = async (ctx) => {};

let createProductType = async (ctx) => {};

let updateProductType = async (ctx) => {};

let deleteProductType = async (ctx) => {};

module.exports = {
    'GET /product_types': getProductTypes,
    'POST /product_types': createProductType,
    'PUT /product_types/:id': updateProductType,
    'DELETE /product_types/:id': deleteProductType
};
