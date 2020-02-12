var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wordcount"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
  // con.query('select word, num from words', (err, res) => {
  //   console.log(res);
  // });
});

module.exports = con;