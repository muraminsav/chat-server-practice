const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const config = {
  host: "localhost",
  dialect: "postgres",
};

const sequelize = new Sequelize("chat_server", "postgres", "1234", config);
const db = {};

//returns an array that contains the name of the file.
const files = fs.readdirSync(__dirname);

for (const file of files) {
  //searching through all files in this directory, wants all except index.js
  if (file !== "index.js") {
    console.log(file);
    //looping through the files in the models folder.
    //as we are requiring each one, we can immediately call the file it is exporting
    //this is creating the table, and then saves the incident of this table in the empty db obj
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    // console.log(model);
    db[model.name] = model;
    console.log(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
