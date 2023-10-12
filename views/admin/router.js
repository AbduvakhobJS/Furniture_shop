const express = require('express')
const router = express.Router()


router.get('/admin/dashboard', async (req, res, next) => {
    res.render('./admin/pages/index.ejs', { layout: './admin/main.ejs', url: "/admin/dashboard"})
})
router.get('/admin/category', async (req, res, next) => {
    res.render('./admin/pages/category.ejs', { layout: './admin/main.ejs', url: "" })
})









module.exports = router