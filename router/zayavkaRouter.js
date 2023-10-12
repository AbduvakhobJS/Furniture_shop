const express = require('express')
const router = express.Router()
const ZayavkaController = require('../controller/zayavkaController')

router.post('/create', ZayavkaController.create)
router.get('/all', ZayavkaController.getAll)
router.get('/:id', ZayavkaController.getOne)
router.put('/:id', ZayavkaController.update)
router.delete('/:id', ZayavkaController.delete)


module.exports = router