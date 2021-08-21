const db = require("../models/index.js");

//no need to separate controller and model functions
//model used to create the the table
//controller creates instances for table and retrieves messages

async function getMessage(ctx) {
  try {
    //using await to handle the promise object that is returned from the models function

    const messages = await db.messages.findAll();
    console.log(messages);
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
    const id = ctx.params;
    console.log(id);
    const { content, authorId, timestamp } = message;

    //const msgGB = await db.messages.create(message)
    const msgDB = await db.messages.create({
      content: content,
      authorId: authorId,
      timestamp: timestamp,
    });

    //don't seem to need the below
    ctx.body = msgDB;
    ctx.status = 201;
    //return works in rendering old messages, but it doesn't pass anything back
    // return msgDB;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

async function createUser(ctx) {
  console.log("createUser function");
  try {
    const user = await db.user.create(ctx.request.body);
    console.log(user);
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = error;
  }
}

// async function checkUser(id) {
//   const uId = await db.user.findAll({ where: { authorId: `'${id}'` } });
//   console.log("uId", uId);
//   if (uId === []) {
//     console.log("Iam falsy!");
//     const newId = await db.user.create({
//       name: uId,
//     });
//     return newId;
//   }
// }

module.exports = { saveMessage, getMessage, createUser };
