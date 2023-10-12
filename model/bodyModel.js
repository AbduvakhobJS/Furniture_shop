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
    category_ID: {
        type: mongoose.Schema.ObjectId, 
        ref: "category", 
        required: true
    },
    article_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "article", 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {type: Date, default: Date.now()}
})


module.exports = mongoose.model("body", DefaultSchema)