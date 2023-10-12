const express = require('express');
const router = express.Router()
const ClientController = require('../controller/clientController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/clientImage')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), ClientController.createImage)
router.get('/all', ClientController.getAll)
router.get('/:id', ClientController.getOne)
router.put('/:id', upload.array("FILE"), ClientController.updateFile)
router.delete('/:id', ClientController.deleteFile)



module.exports = router