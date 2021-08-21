const Router = require("@koa/router");

const router = new Router();

module.exports = router;

const messageController = require("./controllers/messageControllers");

router.get("/messages", messageController.getMessage);

router.post("/messages", messageController.saveMessage);
