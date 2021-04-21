const express = require('express');
const router = express.Router();

const config = require('../config.json')
const selectLang = require('./select-lang')
const Request = require('../db/request')
const Training = require('../db/training')

/* GET home page. */
router.get('/', async function (req, res, next) {
    const lan = selectLang(req.query.lang)
    const reqs = (await Request.find()).reverse()
    const tr = (await Training.find()).reverse()
    res.render('admin.ejs', {lang: lan, colors:config.colors, requests:reqs, trainings:tr});
});


module.exports = router;