const express = require('express')
const router = express.Router()
const siteController = require("../controllers/SiteControllers")
const mdw = require("../middlewares/authent")


// chú ý tuyến đường đi từ trên xuống
router.get('/create/question/:slug', siteController.createQuestion)
router.post('/post/tittle', siteController.postTittle)
router.get('/detail/:id', siteController.detail)
router.patch('/submit/:id', siteController.submit)
router.get('/logout', siteController.logout)
router.get('/login', siteController.login)
router.get('/register', siteController.register)
router.post('/post/login', siteController.postLogin)
router.post('/post/register', siteController.postRegister)
router.post('/register', siteController.postRegister)
router.get('/register', siteController.register)
router.get('/',mdw.checkUser, siteController.home)


module.exports = router