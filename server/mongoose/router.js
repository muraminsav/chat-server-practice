const Router = require("@koa/router");

const router = new Router();

const messageController = require("./controllers/messageControllers");

router.get("/messages/:user", messageController.getMessage);

router.post("/messages/:user", messageController.saveMessage);


module.exports = router;
