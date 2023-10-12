const express = require('express');
const router = express.Router()
const DastavkaController = require('../controller/dastavkaController')
const multer = require('multer');
const path = require('path')
const md5 = require('md5');



const Storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './public/dastavkaImage')
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: Storage })

router.post('/create', upload.array("FILE"), DastavkaController.createImage)
router.get('/all', DastavkaController.getAll)
router.get('/:id', DastavkaController.getOne)
router.put('/:id', upload.array("FILE"), DastavkaController.updateFile)
router.delete('/:id', DastavkaController.deleteFile)



module.exports = router