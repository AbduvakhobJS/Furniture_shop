const mongoose = require('mongoose')
DefaultSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    workTime: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {type: Date, default: Date.now()}
})




module.exports = mongoose.model("dastavka", DefaultSchema)