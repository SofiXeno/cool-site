const express = require('express');
const router = express.Router();

const config = require('../config.json')
const selectLang = require('./select-lang')

/* GET home page. */
router.get('/', function (req, res, next) {
    const lan = selectLang(req.query.lang)
    res.render('admin.ejs', {lang: lan, colors:config.colors});
});


module.exports = router;