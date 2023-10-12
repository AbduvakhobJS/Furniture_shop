const mongoose = require("mongoose");
const DefaultSchema = mongoose.Schema({
    category_ID: { type: mongoose.Schema.ObjectId, ref: "category", required: true },
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    date: { type: Date, default: Date.now() },
})
module.exports = mongoose.model("rating", DefaultSchema)