const Router = require("@koa/router");

const router = new Router();

const messagesController = require("./controllers/messagesController");

router.get("/messages", messagesController.getMessage);

router.post("/messages", messagesController.saveMessage);

router.post("/user", messagesController.createUser);

module.exports = router;
