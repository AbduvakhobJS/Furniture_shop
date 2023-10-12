const mongoose = require('mongoose')
DefaultSchema = mongoose.Schema({
    image: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
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
    dete: {
        type: Date, default: Date.now()
    }
})



module.exports = mongoose.model("material", DefaultSchema)