const express = require('express');
const router = express.Router()
const CategoryController = require('../controller/categoryController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/categoryImage')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("images", 12), CategoryController.createImage)
router.get('/all', CategoryController.getAll)
router.get('/:id', CategoryController.getOne)
router.put('/:id', upload.array("images", 12), CategoryController.updateFile)
router.delete('/:id', CategoryController.deleteFile)

  

module.exports = router