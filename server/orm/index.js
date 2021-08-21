const Koa = require("koa");

const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");

const router = require("./router");
const db = require("./models/index.js");

const app = new Koa();

//alternative way to get serve static files.
//app.use(serve(path.join(__dirname, '..', '..', 'client')));
app.use(serve("../../client"));

app.use(bodyParser());
app.use(router.routes());

const PORT = 4000;

(async function bootstrap() {
  try {
    await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`server listening on http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
