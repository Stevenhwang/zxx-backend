const jwt = require('jsonwebtoken');
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
        };
        const token = jwt.sign(userInfo, 'secret', { expiresIn: '1d' });
        ctx.body = {
            code: 0,
            token: token,
            msg: '登录成功！'
        };
    }
};

let getUserInfo = async (ctx) => {
    let token = ctx.query.token
    if (token) {
        ctx.body = {
            code: 0,
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'admin'
        }
    }
}

let logout = async (ctx) => {
    ctx.body = {
        code: 0,
        msg: '登出成功！'
    }
}

module.exports = {
    'POST /login': login,
    'GET /userInfo': getUserInfo,
    'POST /logout': logout
};
