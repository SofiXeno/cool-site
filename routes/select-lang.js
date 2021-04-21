const ua = require('../languages/ua.json')
const en = require('../languages/en.json')


module.exports = (lang) => {
    switch (lang){
        case "ua": return ua
        case "en": return en
        default: return ua
    }

}
