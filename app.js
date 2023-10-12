const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const expresslayouts = require('express-ejs-layouts')
const Database = require('./Database/userDatabase')




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({origin: "*"}))
app.use(expresslayouts)



app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
Database.DatabaseConnection()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.use(require('./views/admin/router')) // admin


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.use('/zayavka', require('./router/zayavkaRouter'))
app.use('/material', require('./router/materialRouter'))
app.use('/dastavka', require('./router/dastavkaRouter'))
app.use('/contact', require('./router/contactRouter')) 
app.use('/client', require('./router/clientRouter'))
app.use('/article', require('./router/articleRouter'))
app.use('/category', require('./router/categoryRouter'))
app.use('/body', require('./router/bodyRouter'))
app.use('/aboutUs', require('./router/aboutUsRouter'))
app.use('/rating', require('./router/ratingRouter'))
app.use('/user', require('./router/userRouter'))




app.listen(7000, () => {
    console.log("Server is runnig");
})




