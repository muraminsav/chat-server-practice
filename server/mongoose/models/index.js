const mongoose = require("mongoose");

//we are exporting the connected instance of mongoose so we are connected to the database when we pass it.
mongoose.connect("mongodb://localhost:27017/chatMessages", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
