var express = require('express');
var router = express.Router();
var helpers = require('../helpers/words');
// var db = require('../database/connect');

router.route('/')
    .get(helpers.getWords);

router.route('/:word')
    .get(helpers.getWord);

module.exports = router;