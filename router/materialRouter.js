const express = require('express');
const router = express.Router()
const MaterialController = require('../controller/materialController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/materialImage')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), MaterialController.createImage)
router.get('/all', MaterialController.getAll)
router.get('/:id', MaterialController.getOne)
router.put('/:id', upload.array("FILE"), MaterialController.updateFile)
router.delete('/:id', MaterialController.deleteFile)



module.exports = router