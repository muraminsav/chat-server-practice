const Router = require('@koa/router');

const router = new Router()

const messageController = require('./messageController')
 
router.get('/messages', messageController.getMessage);

router.post('/messages', messageController.saveMessage);

module.exports =router;