const ua = require('../locales/ua.json')
const en = require('../locales/en.json')


module.exports = (lang) => {
    switch (lang){
        case "ua": return ua
        case "en": return en
        default: return ua
    }

}
