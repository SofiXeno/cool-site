const express = require('express');
const router = express.Router();

const config = require('../config.json')
const selectLang = require('./select-lang')

/* GET home page. */
router.get('/', function(req, res, next) {
  const lan = selectLang(req.query.lang)
  res.render('index.ejs',{menuTabs:config.menuTabs, lang: lan, colors:config.colors});
});

router.get('/confirmed', async(req, res) => {
  const lang = selectLang(req.query.lang)
  res.render('application_success.ejs', {lang:lang, message:lang.application.confirmed, colors:config.colors, menuTabs:config.menuTabs})
})

router.get('/needConfirm', async(req, res) => {
  const lang = selectLang(req.query.lang)
  res.render('application_success.ejs', {lang:lang, message:lang.application.need_confirmation, colors:config.colors, menuTabs:config.menuTabs})
})

router.get('/confirmSuccess', async(req, res) => {
  const lang = selectLang(req.query.lang)
  res.render('application_success.ejs', {lang:lang, message:lang.application.confirm_success, colors:config.colors, menuTabs:config.menuTabs})
})

router.get('/fail', async(req, res) => {
  const lang = selectLang(req.query.lang)
  res.render('application_success.ejs', {lang:lang, message:lang.application.fail, colors:config.colors, menuTabs:config.menuTabs})
})


module.exports = router;
