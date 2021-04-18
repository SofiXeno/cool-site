var express = require('express');
var router = express.Router();

const config = require('../config.json')


const selectLang = require('./select-lang')

/* GET home page. */
router.get('/', function(req, res, next) {
    const lan = selectLang(req.query.lang)
    res.render('about-us.ejs',{menuTabs:config.menuTabs, lang: lan});
});


module.exports = router;