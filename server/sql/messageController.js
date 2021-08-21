const messageModel = require("./messageModel");

async function getMessage(ctx) {
  try {
    //using .then to handle the promise object
    // const messages = messageModel.find();
    // return messages.then(function (messages){
    //   ctx.body = messages
    //   console.log('ctx.body', ctx.body)
    // })

    //using await to handle the promise object that is returned from the models function
    const messages = await messageModel.find();
    ctx.body = messages;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

async function saveMessage(ctx) {
  try {
    const message = ctx.request.body;
    console.log(message);
    messageModel.save(message);
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

module.exports = { saveMessage, getMessage };
