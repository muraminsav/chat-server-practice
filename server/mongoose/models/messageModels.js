const mongoose = require("./");

const Schema = mongoose.Schema;

//sets up schema, that all documents (instances of schemas will be based on)
const messageSchema = new Schema({
  user : {type: String, required: true},
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
});

const Message = mongoose.model( 'message', messageSchema);

module.exports = Message;