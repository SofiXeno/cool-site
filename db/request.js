const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    name:{type:String, required:true},
    message:{type:String, required:true},
    phone:{type:String, required:true},
    email:{type:String, required:true},
    confirmed: {type: Boolean, required:true}

})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request