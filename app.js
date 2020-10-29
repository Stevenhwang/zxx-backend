const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const router = require("./router");

const app = new Koa();

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

// jwt
app.use(async (ctx, next) => {
  if (ctx.url === '/api/login') {
    await next()
  } else {
    let token = ctx.request.headers['x-token']
    if (token) {
      try {
        let decoded = await verify(token, 'secret');
        //set ctx
        ctx.set('username', decoded.username);
        await next()
      } catch (err) {
        if (err.name === 'TokenExpiredError'
          || err.name === 'JsonWebTokenError'
          || err.name === 'NotBeforeError') {
          console.log(err)
          ctx.body = { code: 3, msg: '非法token!' }
        }
      }
    } else {
      ctx.body = {code: 3, msg: '没有token!'}
    }
  }
})

// catch error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error)
    ctx.body = {code: 5, msg: '服务器错误！'}
  }
})

app.use(bodyParser());
app.use(router());

app.listen(3000);
console.log('app started at port 3000...');
