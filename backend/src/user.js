const mysql = require("mysql");
const Promise = require("bluebird");
const { listen } = require("express/lib/application");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "Backend",
};

const msg = { msg: "Hello, how are you?" };

const addMsg = async (msg) => {
  const connection = mysql.createConnection(dbinfo);

  await connection.connectAsync();

  const sql = `insert into messages (msg) values (?)`;
  await connection.queryAsync(sql, [msg.msg]);
  console.log("Message added into database");

  await connection.endAsync();
};

// addMsg(msg);

const selectMsg = async () => {
  const connection = mysql.createConnection(dbinfo);

  await connection.connectAsync();

  const sql = `select * from messages`;
  const list = await connection.queryAsync(sql);
  console.log(list);

  await connection.endAsync();
  return list;
};

module.exports = { addMsg, selectMsg };
