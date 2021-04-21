const mongoose = require('mongoose')

const trainingInfo = new mongoose.Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    smallText: {type: String, required: true},
    bigText: {type: String, required: true}
})

const trainingSchema = new mongoose.Schema({
    en: {type: trainingInfo, required: true},
    ua: {type: trainingInfo, required: true},
    author: {type: String, required: true},
    date: {type: Date, required: true}
})

const Training = mongoose.model('Training', trainingSchema)

module.exports = Training