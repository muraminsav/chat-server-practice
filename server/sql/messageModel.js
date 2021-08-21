/* Client
const pg = require('pg');
const conString = "postgres://postgres:1234@localhost:5432/chat_server"
const pgClient = new pg.client(constring)
pgClient.connect()
*/

//Allows us to interact with postgres. 'pg' has a .Pool object on it.
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chat_server",
  password: "1234",
  port: 5432,
});

//Unsure if pool.connect() is actually needed
//pool.connect();

async function find() {
  const res = await pool.query("SELECT * FROM messages");
  //returns a promise object so needs to asynchronous
  console.log("res.rows", res.rows);
  return res.rows;
}

// In the function below the query is not paramtized - at rsk of SQL injection
// function save(msg) {
//   pool.query(`
//   INSERT INTO messages (content, "authorId", timestamp)
//   VALUES ('${msg.content}', ${msg.authorId}, ${msg.timestamp})
//   `);
// }

function save(msg) {
  const insertText =
    'INSERT INTO messages (content, "authorId", timestamp) VALUES($1, $2, $3)';
  const { content, authorId, timestamp } = msg;
  pool.query(insertText, [content, authorId, timestamp]);
}

module.exports = { save, find };
