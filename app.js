const Koa = require('koa');
const bodyParser = require("koa-bodyparser");
const jwt = require('jsonwebtoken');
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
  if (ctx.url === '/login') {
    await next()
  } else {
    let token = ctx.request.headers['x-token']
    if (token) {
      try {
        let decoded = jwt.verify(token, 'secret');
        //set ctx
        ctx.set('username', decoded.username)
        await next()
      } catch (err) {
        ctx.body = {code: 3, msg: '非法token!'}
      }
    } else {
      ctx.body = {code: 3, msg: '没有token!'}
    }
  } 
})

app.use(bodyParser());
app.use(router());

app.listen(3000);
console.log('app started at port 3000...');
