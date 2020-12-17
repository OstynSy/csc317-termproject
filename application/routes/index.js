var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware');

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
    res.render('index',{title:"AniMedia"});
});

//localhost:3000/login
router.get('/login', (req, res, next) => {
    res.render('login', { title: "Log In" });
});

//localhost:3000/registration
router.get('/registration', (req, res, next) => {
    res.render('registration', {title: "Register" });
});

router.use('/postimage', isLoggedIn)

//localhost:3000/postimage
router.get('/postimage', (req, res, next) => {
    res.render('postimage', {title: "Create Post" });
});

//localhost:3000/post/ID
router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
    res.render('imagepost', { title: `Post ${req.params.id}`});
});

module.exports = router;
