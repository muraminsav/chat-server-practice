const MongoClient = require("mongodb").MongoClient;

const database = {};

async function main() {
  //uri = link to mongodb on local host
  const uri = "mongodb://localhost:27017";
  // const client = new MongoClient(uri);

  // try {
  //connects to the mongodb cluster
  await MongoClient.connect(uri, function (err, client) {
    // console.log(uri);
    const db = client.db("messages");
    // console.log("db", db);
    database.db = db;
  });
  // } catch (e) {
  //   console.log(e);
  // }
}
main().catch(console.error);

module.exports = database;
