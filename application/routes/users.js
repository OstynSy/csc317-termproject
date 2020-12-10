var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserError = require('../helpers/error/UserError');
const p = require('../helpers/debug/debugprinters')
/* GET users listing. */

//localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//localhost:3000/users/register
router.post('/register', (req, res, next) => {
    let username = req.body.uname;
    let email = req.body.email;
    let password = req.body.pword;
    let cpassword = req.body.cpword;

    db.execute("SELECT * FROM users WHERE username=?", [username])
    .then(([results, fields]) => {
        if (results && results.length == 0) {
            return db.execute("SELECT * FROM users WHERE email=?", [email]);
        }
        else{
            throw new UserError(
            "Registration Failed: Username already exists",
            "/registration",
            200
            );
        }
    })
    .then(([results, fields]) => {
        if (results && results.length == 0) {
            let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());"
            return db.execute(baseSQL, [username, email, password]);
        }
        else {
            throw new UserError(
            "Registration Failed: Email already exists",
            "/registration",
            200
            );
        }
    })
    .then(([results, fields]) => {
        if (results && results.affectedRows) {
            p.successPrint("User.js --> user was created");
            res.redirect('/login');
        }
        else {
            throw new UserError(
            "Server Error, user could not be created",
            "/registration",
            500
            );
        }
    })
    .catch((err)=> {
        errorPrint("User could not be made", err);
        if (err instanceof UserError) {
            p.errorPrint(err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }
        else {
            next(err);
        }
    })
});

module.exports = router;
