const express = require('express')
const router = express.Router()
const siteController = require("../controllers/SiteControllers")


// chú ý tuyến đường đi từ trên xuống
router.get('/detail', siteController.detail)
router.get('/login', siteController.login)
router.post('/login', siteController.postLogin)
router.post('/register', siteController.postRegister)
router.get('/register', siteController.register)
router.get('/', siteController.home)


module.exports = router