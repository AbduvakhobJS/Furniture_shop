const mongoose = require('mongoose')
exports.DatabaseConnection = () => {
    mongoose.connect("mongodb://localhost:27017/HADID_MEBEL" , {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database is on")
    })
    .catch((error) => {
        console.log("Database id off", error);
    })
}

