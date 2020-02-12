var con = require('../database/connect');

exports.getWords = (req, res) => {
  let sql = `SELECT w.word, sum(w.num) AS num, s.sourceName AS source
            FROM words w
            JOIN articles a ON a.ID = w.articleID
            JOIN sources s ON s.ID = a.sourceID
            GROUP BY w.word, s.sourceName;`;
  // let sql = `SELECT word, num FROM words`;
  con.query(sql, (err, results) => {
      if (err) throw err;
      // let json = JSON.stringify(results);
      console.log(results);
      let retJson = {};
      results.forEach(row => {
        if (!retJson[row.source]) {
          retJson[row.source] = [];
        }
        retJson[row.source].push({word: row.word, num: row.num});
      })
      res.send(JSON.stringify(retJson));
  });
}

exports.getWord = (req, res) => {
  let sql = `SELECT w.num, a.articleName, a.url, s.sourceName AS source
            FROM words w
            JOIN articles a ON a.ID = w.articleID
            JOIN sources s ON a.sourceID = s.ID
            WHERE w.word = '${req.params.word}';`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
}

module.exports = exports;