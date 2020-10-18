const product = require('../models/product');
const ProductType = product.ProductType

let getProductTypes = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    productTypes = await ProductType.findAll({ limit: limit, offset: (page - 1) * limit });
    total = await ProductType.count()
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(productTypes),
        total: total
    };
};

let createProductType = async (ctx) => {
    let name = ctx.request.body.name
    if (!name) {
        ctx.body = {
            code: 1,
            msg: '请输入产品名称！',
        };
    } else {
        let tmp = await ProductType.findOne({ where: { name: name } })
        if (tmp) {
            ctx.body = {
                code: 1,
                msg: '产品名称重复！'
            }
        } else {
            let productType = await ProductType.create({ name: name })
            ctx.body = {
                code: 0,
                msg: `产品类别${productType.name}创建成功！`
            }
        }
    } 
};

let updateProductType = async (ctx) => {
    let id = ctx.params.id
    let name = ctx.request.body.name
    let productType = await ProductType.findByPk(id);
    if (productType === null) {
        ctx.body = {
            code: 1,
            msg: '您提供的ID有误！'
        };
    } else if (!name) {
        ctx.body = {
            code: 1,
            msg: '请输入更新后的产品名称！',
        };
    } else {
        let tmp = await ProductType.findOne({ where: { name: name } })
        if (tmp) {
            ctx.body = {
                code: 1,
                msg: '您输入的产品名称已存在！'
            }
        } else {
            productType.name = name
            await productType.save();
            ctx.body = {
            code: 0,
            msg: '产品名称修改成功！'
            }
        }
    }
};

let deleteProductType = async (ctx) => {
    let id = ctx.params.id
    let productType = await ProductType.findByPk(id);
    if (productType === null) {
        ctx.body = {
            code: 1,
            msg: '您提供的ID有误！'
        };
    } else {
        await productType.destroy()
        ctx.body = {
            code: 0,
            msg: '删除成功！'
        }
    }
};

module.exports = {
    'GET /productTypes': getProductTypes,
    'POST /productTypes': createProductType,
    'PUT /productTypes/:id': updateProductType,
    'DELETE /productTypes/:id': deleteProductType
};
