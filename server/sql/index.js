const Koa = require ('koa');

const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();
app.use(serve('../../client'));

app.use(bodyParser())
app.use(router.routes());

const PORT = 4000;

app.use(async ctx => {
  ctx.body = "hello world";
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost${PORT}`)
});