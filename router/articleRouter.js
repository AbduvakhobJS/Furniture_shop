const express = require('express');
const router = express.Router()
const ArticleController = require('../controller/articleController')
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

router.post('/create', upload.array("FILE"), ArticleController.createImage)
router.get('/all', ArticleController.getAll)
router.get('/:id', ArticleController.getOne)
router.put('/:id', upload.array("FILE"), ArticleController.updateFile)
router.delete('/:id', ArticleController.deleteFile)



module.exports = router