const express = require('express')
const router = express.Router()
const siteController = require("../controllers/SiteControllers")


// chú ý tuyến đường đi từ trên xuống
router.get('/detail/:id', siteController.detail)
router.patch('/submit/:id', siteController.submit)
router.get('/login', siteController.login)
router.get('/register', siteController.register)
router.post('/post/login', siteController.postLogin)
router.post('/register', siteController.postRegister)
router.get('/register', siteController.register)
router.get('/', siteController.home)


module.exports = router