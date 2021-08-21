const message = require("../models/messageModels");





async function getMessage(ctx) {
  try {
    let user =ctx.params.user;
    ctx.body = await message.find({user});
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}


async function saveMessage(ctx) {
  try {
    
    let user =ctx.params.user;
    
    await message.create({...ctx.request.body, user});

    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

module.exports = { getMessage, saveMessage };
