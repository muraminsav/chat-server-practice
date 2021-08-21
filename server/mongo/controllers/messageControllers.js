const database = require("../models/index.js");

async function getMessage(ctx) {
  try {
    let messages = await database.db
      .collection("savedMessages")
      .find({})
      .toArray();

    ctx.body = messages;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

async function saveMessage(ctx) {
  console.log("database", database.db);
  try {
    const message = ctx.request.body;
    const { content, authorId, timestamp } = message;
    const msgDB = await database.db.collection("savedMessages").insertOne({
      content: content,
      authorId: authorId,
      timestamp: timestamp,
    });
    ctx.body = msgDB;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}

module.exports = { getMessage, saveMessage };
