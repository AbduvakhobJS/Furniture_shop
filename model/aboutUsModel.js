const mongoose = require('mongoose')
DefaultSchema = mongoose.Schema({
    image: [{
        type: String
    }],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    companyPhone: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String
    },
    workTime : {
        type: String,
        required: true
    },
    link: {
        type: String,
        requried: true
    },
    date: {type: Date, default: Date.now()}
})


module.exports = mongoose.model("aboutUs", DefaultSchema)