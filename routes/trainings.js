const express = require('express');
const router = express.Router();

const config = require('../config.json')
const selectLang = require('./select-lang')

const Training = require('../db/training')

/* GET home page. */
router.get('/', async function(req, res, next) {
    const lan = selectLang(req.query.lang)
    const training = (await Training.find()).reverse()
    res.render('trainings.ejs',{menuTabs:config.menuTabs, lang: lan, colors:config.colors, trainings:training});
});


module.exports = router;