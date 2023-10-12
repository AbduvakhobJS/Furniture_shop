const mongoose = require('mongoose')
DefaultSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model("zayavka", DefaultSchema)