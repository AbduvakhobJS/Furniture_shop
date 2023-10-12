const express = require('express');
const router = express.Router()
const AboutUsController = require('../controller/aboutUsController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/aboutUsImage')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), AboutUsController.createImage)
router.get('/all', AboutUsController.getAll)
router.get('/:id', AboutUsController.getOne)
router.put('/:id', upload.array("FILE"), AboutUsController.updateFile)
router.delete('/:id', AboutUsController.deleteFile)



module.exports = router