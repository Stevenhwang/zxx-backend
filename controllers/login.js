const user = require('../models/user');
const User = user.User

let login = async (ctx) => {
    let username = ctx.request.body.username || '';
    let password = ctx.request.body.password || '';
    let user = await User.findOne({ where: { username: username } });
    if (user === null) {
        ctx.response.body = {
            code: 1,
            msg: '用户名错误！'
        };
    } else if (user.password != password) {
        ctx.response.body = {
            code: 2,
            msg: '密码错误！'
        };
    } else { 
        ctx.response.body = {
            code: 0,
            msg: '登录成功！'
        };
    }
};

module.exports = {
    'POST /login': login
};
