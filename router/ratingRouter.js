const express = require('express')
const router = express.Router()
const RatingController = require('../controller/ratingController')


router.post('/create', RatingController.createOne)


module.exports = router