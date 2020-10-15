const user = require('../models/user');
User = user.User

var login = async (ctx) => {
    let users = await User.findAll();
    ctx.response.body = {
        code: 0,
        msg: JSON.stringify(users)
    };
};

module.exports = {
    'GET /': login
};
