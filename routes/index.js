var express = require('express');
var router = express.Router();

const config = require('../config.json')
const ua = require('../locales/ua.json')
const en = require('../locales/en.json')

function selectLang(lang){
  switch (lang){
    case "ua": return "ua"
    case "en": return "en"
    default: return "en"
  }

}

/* GET home page. */
router.get('/', function(req, res, next) {
  const lan = selectLang(req.params.lang)
  res.render('index.ejs',{menuTabs:config.menuTabs, lang: lan});
});


module.exports = router;
