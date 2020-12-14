var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserError = require('../helpers/error/UserError');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');
/* GET users listing. */

//localhost:3000/users/register
router.post('/register', (req, res, next) => {
    let username = req.body.uname;
    let email = req.body.email;
    let password = req.body.pword;
    let cpassword = req.body.cpword;

    //validate data, if bad send back response
    //res.redirect('/registration')

    db.execute("SELECT * FROM users WHERE username=?", [username])
        .then(([results, fields]) => {
            if (results && results.length == 0) {
                return db.execute("SELECT * FROM users WHERE email=?", [email]);
            }
            else{
                throw new UserError("Registration Failed: Username already exists", "/registration", 200);
            }
        })
        .then(([results, fields]) => {
            if (results && results.length == 0) {
                return bcrypt.hash(password, 10);
            }
            else {
                throw new UserError("Registration Failed: Email already exists", "/registration", 200);
            }
        })
        .then((hashedPassword) => {
                let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());"
                return db.execute(baseSQL, [username, email, hashedPassword]);
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                successPrint("User.js --> user was created");
                req.flash('success', 'User account has been created!');
                res.redirect('/login');
            }
            else {
                throw new UserError("Server Error, user could not be created", "/registration", 500);
            }
        })
        .catch((err)=> {
            errorPrint("User could not be made", err);
            if (err instanceof UserError) {
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            }
            else {
                next(err);
            }
        })
});

router.post('/login', (req, res, next) => {
    let username = req.body.uname;
    let password = req.body.pword;

        //validate data, if bad send back response
    //res.redirect('/registration')

    let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"
    let userId;
    db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length == 1) {
                let hashedPassword = results[0].password;
                userId = results[0].id;
                return bcrypt.compare(password, hashedPassword);
            }
            else {
                throw new UserError("Invalid username or password!", "/login", 200);
            }
        })
        .then((passwordsMatched) => {
            if (passwordsMatched) {
                successPrint(`User ${username} is logged in`);
                req.session.username = username;
                req.session.userId = userId;
                res.locals.logged = true;
                req.flash('success', 'You have been successfully Logged in!');
                res.redirect('/');
            }
            else {
                throw new UserError("Invalid username or password!", "/login", 200);
            }
        })
        .catch((err) => {
            errorPrint("User login failed");
            if (err instanceof UserError) {
                errorPrint(err.getMessage());
                req.flash('error', err.getMessage());
                res.status(err.getStatus());                  
            }
            else {
                next(err);
            } 
        })
});

router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            errorPrint('Session could not be destroyed.');
            next(err);
        }
        else {
            succesPrint('Session was destroyed');
            res.clearCookie('csid');
            res.json({ status: "OK", message: "user is logged out" });
        }
    })
});

module.exports = router;
