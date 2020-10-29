const { Payment, Respay } = require('../models/moneyFlow');
const { Op } = require("sequelize");

let getPayments = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let payments = []
    let total = 0
    if (!searchKey) {
        payments = await Payment.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Payment.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        payments = await Payment.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Payment.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        payments = await Payment.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Payment.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(payments),
        total: total
    };
};

let createPayment = async (ctx) => {
    let data = ctx.request.body
    await Payment.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updatePayment = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Payment.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deletePayment = async (ctx) => {
    let id = ctx.params.id
    let temp = await Payment.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

let getRespays = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let respays = []
    let total = 0
    if (!searchKey) {
        respays = await Respay.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Respay.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        respays = await Respay.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Respay.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        respays = await Respay.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Respay.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(respays),
        total: total
    };
};

let createRespay = async (ctx) => {
    let data = ctx.request.body
    await Respay.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateRespay = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Respay.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteRespay = async (ctx) => {
    let id = ctx.params.id
    let temp = await Respay.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

module.exports = {
    'GET /api/payments': getPayments,
    'POST /api/payments': createPayment,
    'PUT /api/payments/:id': updatePayment,
    'DELETE /api/payments/:id': deletePayment,
    'GET /api/respays': getRespays,
    'POST /api/respays': createRespay,
    'PUT /api/respays/:id': updateRespay,
    'DELETE /api/respays/:id': deleteRespay
};
