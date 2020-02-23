require('../database/database');
const mongoose = require('mongoose');

const words = mongoose.model('words');
const articles = mongoose.model('articles');
const sources = mongoose.model('sources');

exports.getWords = (req, res) => {
  console.log(`new beginnings`);
  let json = {};

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
  let word = req.params.word;
  let json = {};
  words.find({'word': word}).populate('articleId').then(result => {
    json[word] = {};
    result.forEach(a => {
      // console.log(`a=${a}`);
      if (!json[word][a.articleId._id]) {
        json[word][a.articleId._id] = {};
        json[word][a.articleId._id].url = a.articleId.url;
        json[word][a.articleId._id].name = a.articleId.name;
        json[word][a.articleId._id].num = a.num;
      }
    });
  })
  .catch((err) => {
    console.log(`\nNOPE: ${err}\n`);
  })
  .then(() => {
    res.send(json);
  })
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