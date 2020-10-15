var login = async (ctx) => {
    var name = ctx.params.name;
    ctx.response.body = {
        code: 0,
        msg: name
    };
};

module.exports = {
    'GET /hello/:name': login
};
