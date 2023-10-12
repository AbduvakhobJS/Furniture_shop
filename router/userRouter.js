const express = require('express')
const router = express.Router()
const UserController = require('../controller/userController')
const multer = require('multer')
const md5 = require('md5')
const path = require('path')


const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/token', UserController.decodeToken)
router.get('/:id', UserController.getOne)
router.delete('/:id', UserController.deleteOne)



module.exports = router