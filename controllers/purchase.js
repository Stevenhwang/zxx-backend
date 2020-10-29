const material = require('../models/material');
const MaterialType = material.MaterialType;
const Material = material.Material;
const Change = material.Change;
const { Op } = require("sequelize");

let getMaterialTypes = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let search = ctx.query.search
    let materialTypes = []
    let total = 0
    if (search) {
        materialTypes = await MaterialType.findAll({ where: { name: search }, limit: limit, offset: (page - 1) * limit })
        total = await MaterialType.count()
    } else {
        materialTypes = await MaterialType.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await MaterialType.count()
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(materialTypes),
        total: total
    };
};

let createMaterialType = async (ctx) => {
    let name = ctx.request.body.name
    if (!name) {
        ctx.body = {
            code: 1,
            msg: '请输入材料名称！',
        };
    } else {
        let tmp = await MaterialType.findOne({ where: { name: name } })
        if (tmp) {
            ctx.body = {
                code: 1,
                msg: '材料名称重复！'
            }
        } else {
            let materialType = await MaterialType.create({ name: name })
            ctx.body = {
                code: 0,
                msg: `材料类别${materialType.name}创建成功！`
            }
        }
    } 
};

let updateMaterialType = async (ctx) => {
    let id = ctx.params.id
    let name = ctx.request.body.name
    let materialType = await MaterialType.findByPk(id);
    if (materialType === null) {
        ctx.body = {
            code: 1,
            msg: '您提供的ID有误！'
        };
    } else if (!name) {
        ctx.body = {
            code: 1,
            msg: '请输入更新后的材料名称！',
        };
    } else {
        let tmp = await MaterialType.findOne({ where: { name: name } })
        if (tmp) {
            ctx.body = {
                code: 1,
                msg: '您输入的材料名称已存在！'
            }
        } else {
            materialType.name = name
            await materialType.save();
            ctx.body = {
            code: 0,
            msg: '材料名称修改成功！'
            }
        }
    }
};

let deleteMaterialType = async (ctx) => {
    let id = ctx.params.id
    let materialType = await MaterialType.findByPk(id);
    if (materialType === null) {
        ctx.body = {
            code: 1,
            msg: '您提供的ID有误！'
        };
    } else {
        await materialType.destroy()
        ctx.body = {
            code: 0,
            msg: '删除成功！'
        }
    }
};

let getMaterials = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let materials = []
    let total = 0
    if (!searchKey) {
        materials = await Material.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Material.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        materials = await Material.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Material.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        materials = await Material.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Material.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(materials),
        total: total
    };
};

let createMaterial = async (ctx) => {
    let data = ctx.request.body
    await Material.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateMaterial = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Material.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteMaterial = async (ctx) => {
    let id = ctx.params.id
    let temp = await Material.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

let getChanges = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let searchKey = ctx.query.searchKey
    let searchValue = ctx.query.searchValue
    const search = {}
    search[searchKey] = searchValue
    let changes = []
    let total = 0
    if (!searchKey) {
        changes = await Change.findAll({ limit: limit, offset: (page - 1) * limit });
        total = await Change.count()
    } else if (searchKey === "date") {
        const dateList = searchValue.split(',')
        changes = await Change.findAll({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            },
            limit: limit, offset: (page - 1) * limit
        })
        total = await Change.count({
            where: {
                date: {
                    [Op.between]: [dateList[0], dateList[1]]
                }
            }
        })
    } else {
        changes = await Change.findAll({ where: search, limit: limit, offset: (page - 1) * limit })
        total = await Change.count({ where: search })
    }
    ctx.body = {
        code: 0,
        msg: '获取成功！',
        data: JSON.stringify(changes),
        total: total
    };
};

let createChange = async (ctx) => {
    let data = ctx.request.body
    await Change.create(data)
    ctx.body = {
        code: 0,
        msg: '创建成功！'
    }
};
let updateChange = async (ctx) => {
    let id = ctx.params.id
    let data = ctx.request.body
    let temp = await Change.findByPk(id);
    await temp.update(data)
    ctx.body = {
        code: 0,
        msg: '修改成功！'
    }
};

let deleteChange = async (ctx) => {
    let id = ctx.params.id
    let temp = await Change.findByPk(id);
    await temp.destroy()
    ctx.body = {
        code: 0,
        msg: '删除成功！'
    }
};

module.exports = {
    'GET /api/materialTypes': getMaterialTypes,
    'POST /api/materialTypes': createMaterialType,
    'PUT /api/materialTypes/:id': updateMaterialType,
    'DELETE /api/materialTypes/:id': deleteMaterialType,
    'GET /api/materials': getMaterials,
    'POST /api/materials': createMaterial,
    'PUT /api/materials/:id': updateMaterial,
    'DELETE /api/materials/:id': deleteMaterial,
    'GET /api/changes': getChanges,
    'POST /api/changes': createChange,
    'PUT /api/changes/:id': updateChange,
    'DELETE /api/changes/:id': deleteChange
};
