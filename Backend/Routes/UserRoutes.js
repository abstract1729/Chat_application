//Define all routing related to users here.
//Create a route for logout where cookies are to be deleted.
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const UserCtrl = require('../Controllers/UserControllers')
const PageCtrl = require('../Controllers/PageController')
const UserAuth = require("../Middlewares/UserAuth")

var urlEncoderParser = bodyParser.urlencoded({ extended: false })

router.use(bodyParser.json())

router.get('/login', PageCtrl.loginPage)
router.get('/register', PageCtrl.registerPage)
router.post('/register', (req, res) => {
    res.redirect('/login')
})

router.post('/login', urlEncoderParser, UserCtrl.sendToken)
module.exports = router