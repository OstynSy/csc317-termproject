var express = require('express');
var router = express.Router();
var db = require('../config/database');
/* GET users listing. */

//localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//localhost:3000/users/register
router.post('/register', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
