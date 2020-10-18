const material = require('../models/material');
const MaterialType = material.MaterialType;

let getMaterialTypes = async (ctx) => {
    let page = ctx.query.page || 1
    let limit = ctx.query.limit || 15
    let search = ctx.query.search
    let materialTypes = []
    let total = 0
    if (search) {
        materialTypes = await MaterialType.findOne({ where: { name: search }, limit: limit, offset: (page - 1) * limit })
        total = 1
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

module.exports = {
    'GET /materialTypes': getMaterialTypes,
    'POST /materialTypes': createMaterialType,
    'PUT /materialTypes/:id': updateMaterialType,
    'DELETE /materialTypes/:id': deleteMaterialType
};
