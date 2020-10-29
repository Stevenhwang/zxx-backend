const product = require('../models/product');
const ProductType = product.ProductType;
const Sale = product.Sale;
const Refund = product.Refund;
const { Op } = require("sequelize");

let getProductTypes = async (ctx) => {
    let page = parseInt(ctx.query.page) || 1
    let limit = parseInt(ctx.query.limit) || 15
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
    let page = parseInt(ctx.query.page) || 1
    let limit = parseInt(ctx.query.limit) || 15
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

let getRefunds = async (ctx) => {
    let page = parseInt(ctx.query.page) || 1
    let limit = parseInt(ctx.query.limit) || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let refunds = []
    let total = 0
    if (!searchKey) {
        refunds = await Refund.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Refund.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        refunds = await Refund.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Refund.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        refunds = await Refund.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Refund.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(refunds),
        total: total
    };
};

let createRefund = async (ctx) => {
    let data = ctx.request.body
    await Refund.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateRefund = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Refund.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteRefund = async (ctx) => {
    let id = ctx.params.id
    let temp = await Refund.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

module.exports = {
    'GET /api/productTypes': getProductTypes,
    'POST /api/productTypes': createProductType,
    'PUT /api/productTypes/:id': updateProductType,
    'DELETE /api/productTypes/:id': deleteProductType,
    'GET /api/sales': getSales,
    'POST /api/sales': createSale,
    'PUT /api/sales/:id': updateSale,
    'DELETE /api/sales/:id': deleteSale,
    'GET /api/refunds': getRefunds,
    'POST /api/refunds': createRefund,
    'PUT /api/refunds/:id': updateRefund,
    'DELETE /api/refunds/:id': deleteRefund
};
