const product = require('../models/product');
const ProductType = product.ProductType
const Sale = product.Sale
const Refund = product.Refund

let getProductTypes = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let search = ctx.query.search
    let productTypes = []
    let total = 0
    if (search) {
        productTypes = await ProductType.findAll({ where: { name: search }, limit: limit, offset: (page - 1) * limit })
        total = await ProductType.count()
    } else {
        productTypes = await ProductType.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await ProductType.count()
    }
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

let getSales = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let sales = []
    let total = 0
    if (!searchKey) {
        sales = await Sale.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Sale.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        sales = await Sale.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Sale.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        sales = await Sale.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Sale.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(sales),
        total: total
    };
};

let createSale = async (ctx) => {
    let data = ctx.request.body
    await Sale.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateSale = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Sale.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteSale = async (ctx) => {
    let id = ctx.params.id
    let temp = await Sale.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

module.exports = {
    'GET /productTypes': getProductTypes,
    'POST /productTypes': createProductType,
    'PUT /productTypes/:id': updateProductType,
    'DELETE /productTypes/:id': deleteProductType,
    'GET /sales': getSales,
    'POST /sales': createSale,
    'PUT /sales/:id': updateSale,
    'DELETE /sales/:id': deleteSale
};
