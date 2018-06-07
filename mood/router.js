'use strict';

const express = require('express');
const router = express.Router();
const moodController = require('./moodController');

/* GET mood. */
router.get('/', function(req, res) {
    moodController.getMood(req, res);
});

module.exports = router;
