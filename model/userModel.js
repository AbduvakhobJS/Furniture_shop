const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const DefaultSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: [
            "admin", "moderator"
        ],
        required: true
    },
    date: { type: Date, default: Date.now() },
})


DefaultSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})  


module.exports = mongoose.model("user", DefaultSchema)