const mysql = require("mysql");
try {
  const db = mysql.createConnection({
    host: "192.168.99.158",
    user: "root",
    password: "root",
    database: "hypertube",
  });
  module.exports = db;
} catch (error) {
  // console.log(error)
}
