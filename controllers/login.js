const jwt = require('jsonwebtoken')
const user = require('../models/user');
const User = user.User

let login = async (ctx) => {
    let username = ctx.request.body.username || '';
    let password = ctx.request.body.password || '';
    let user = await User.findOne({ where: { username: username } });
    if (user === null) {
        ctx.body = {
            code: 1,
            msg: '用户名错误！'
        };
    } else if (user.password != password) {
        ctx.body = {
            code: 2,
            msg: '密码错误！'
        };
    } else {
        const userInfo = {
            username: username
        }
        const token = jwt.sign(userInfo, 'secret', {expiresIn: '1d'})
        ctx.body = {
            code: 0,
            token: token,
            msg: '登录成功！'
        };
    }
};

module.exports = {
    'POST /login': login
};
