require('../database/database');
const mongoose = require('mongoose');

const words = mongoose.model('words');
const articles = mongoose.model('articles');
const sources = mongoose.model('sources');

exports.getWords = (req, res) => {
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
  words.find({'word': word}).populate('articleId').populate({path: 'sourceId', select: 'name -_id'}).then(result => {
    json[word] = {};
    result.forEach(a => {
      if (!json[word][a.articleId._id] && a.sourceId.name.toLowerCase() == req.params.source.toLowerCase()) {
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
}

function toS(obj) {
  Object.keys(obj).forEach(k => {
    console.log(`${k}=${obj[k]}`);
  })
}

module.exports = exports;