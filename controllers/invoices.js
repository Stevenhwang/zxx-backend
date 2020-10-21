const { Cancellation, Entryticket } = require('../models/invoice');
const { Op } = require("sequelize");

let getCancellations = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let cancellations = []
    let total = 0
    if (!searchKey) {
        cancellations = await Cancellation.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Cancellation.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        cancellations = await Cancellation.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Cancellation.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        cancellations = await Cancellation.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Cancellation.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(cancellations),
        total: total
    };
};

let createCancellation = async (ctx) => {
    let data = ctx.request.body
    await Cancellation.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateCancellation = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Cancellation.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteCancellation = async (ctx) => {
    let id = ctx.params.id
    let temp = await Cancellation.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

let getEntrytickets = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let entrytickets = []
    let total = 0
    if (!searchKey) {
        entrytickets = await Entryticket.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Entryticket.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        entrytickets = await Entryticket.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Entryticket.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        entrytickets = await Entryticket.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Entryticket.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(entrytickets),
        total: total
    };
};

let createEntryticket = async (ctx) => {
    let data = ctx.request.body
    await Entryticket.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateEntryticket = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Entryticket.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteEntryticket = async (ctx) => {
    let id = ctx.params.id
    let temp = await Entryticket.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

module.exports = {
    'GET /cancellations': getCancellations,
    'POST /cancellations': createCancellation,
    'PUT /cancellations/:id': updateCancellation,
    'DELETE /cancellations/:id': deleteCancellation,
    'GET /entrytickets': getEntrytickets,
    'POST /entrytickets': createEntryticket,
    'PUT /entrytickets/:id': updateEntryticket,
    'DELETE /entrytickets/:id': deleteEntryticket
};
