var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index',{title:"Ostyn APP"});
});

//localhost:3000/login
router.get('/login', (req, res, next) => {
    res.render("login", { title: "Log In" });
});

//localhost:3000/registration
router.get('/registration', (req, res, next) => {
    res.render("registration", {title: "Register" });
});

router.use('/postimage', isLoggedIn)

//localhost:3000/postimage
router.get('/postimage', (req, res, next) => {
    res.render("postimage", {title: "Create Post" });
});

/*
//localhost:3000/logout
router.get('/logout', function (req, res, next) {
    res.send('hello logout.html')
});
*/
module.exports = router;
