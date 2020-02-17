require('../database/database');
const mongoose = require('mongoose');

const words = mongoose.model('words');
const articles = mongoose.model('articles');
const sources = mongoose.model('sources');

exports.getWords = (req, res) => {
  console.log(`new beginnings`);
  let json = {};

  // Promise.all([words.find({"word": "australia"}).populate('sourceId'),sources.find()]).then(result => {
  words.find({}).populate('sourceId').then(result => {
    result.forEach(w => {
      if (!json[w.sourceId.name]) {
        json[w.sourceId.name] = {};
      }
      if (!json[w.sourceId.name][w.word]) {
        json[w.sourceId.name][w.word] = 0;
      }
      json[w.sourceId.name][w.word] += w.num;
    });
  })
  .then(() => {
    res.send(json);
  });
}

exports.getWord = (req, res) => {
  // let sql = `SELECT w.num, a.articleName, a.url, s.sourceName AS source
  //           FROM words w
  //           JOIN articles a ON a.ID = w.articleID
  //           JOIN sources s ON a.sourceID = s.ID
  //           WHERE w.word = '${req.params.word}';`;
  // con.query(sql, (err, results) => {
  //   if (err) throw err;
  //   res.send(JSON.stringify(results));
  // });
}

module.exports = exports;