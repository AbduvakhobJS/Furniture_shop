const express = require('express');
const router = express.Router()
const BodyController = require('../controller/bodyController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/articleImage')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), BodyController.createImage)
router.get('/all', BodyController.getAll)
router.get('/:id', BodyController.getOne)
router.put('/:id', upload.array("FILE"), BodyController.updateFile)
router.delete('/:id', BodyController.deleteFile)



module.exports = router