const material = require('../models/material');
const MaterialType = material.MaterialType;

let getMaterialTypes = async (ctx) => {

};

let createMaterialType = async (ctx) => {

};

let updateMaterialType = async (ctx) => { };

let deleteMaterialType = async (ctx) => { };

module.exports = {
    'GET /material_types': getMaterialTypes,
    'POST /material_types': createMaterialType,
    'PUT /material_types/:id': updateMaterialType,
    'DELETE /material_types/:id': deleteMaterialType
};
