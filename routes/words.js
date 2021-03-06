var express = require('express');
var router = express.Router();
var helpers = require('../helpers/words');

router.route('/')
    .get(helpers.getWords);

router.route('/:source/:word')
    .get(helpers.getWord);

module.exports = router;