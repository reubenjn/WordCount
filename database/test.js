var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wordcount"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT word, num FROM words", function (err, results) {
    if (err) throw err;
    var json = JSON.stringify(results);
    console.log(json);
  });
});