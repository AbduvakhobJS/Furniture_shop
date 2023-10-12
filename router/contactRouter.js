const express = require('express');
const router = express.Router()
const ContactController = require('../controller/contactController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/map')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), ContactController.createImage)
router.get('/all', ContactController.getAll)
router.get('/:id', ContactController.getOne)
router.put('/:id', upload.array("FILE"), ContactController.updateFile)
router.delete('/:id', ContactController.deleteFile)



module.exports = router