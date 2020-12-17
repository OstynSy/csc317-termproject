var express = require('express');
var router = express.Router();
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { check, validationResult} = require('express-validator');

//localhost:3000/users/register
router.post('/register', [
    check('uname').exists(),
    check('email').exists().isEmail(),
    check('pword').exists(),
    check('cpword').exists()
], (req, res, next) => {


    const errors = validationResult(req);
    if (errors.isEmpty() == false) {
        errorPrint("One of the fields is empty!");
        req.flash('error', 'One of the fields is empty!');
        res.redirect('/registration');
        return;
    }

    let username = req.body.uname;
    let email = req.body.email;
    let password = req.body.pword;
    let cpassword = req.body.cpword;

    UserModel.usernameExists(username)
        .then((userNameDoesExist) => {
            if (userNameDoesExist) {
                throw new UserError("Registration Failed: Username already exists", "/registration", 200);
            }
            else {
                return UserModel.emailExists(email);
            }
        })
        .then((emailDoesExist) => {
            if (emailDoesExist) {
                throw new UserError("Registration Failed: Email already exists", "/registration", 200);
            }
            else {
                return UserModel.create(username, password, email);
            }
        })
        .then((createdUserId) => {
            if (createdUserId < 0) {
                throw new UserError("Server Error, user could not be created", "/registration", 500);
            }
            else {
                successPrint("User.js --> user was created");
                req.flash('success', 'User account has been created!');
                res.redirect('/login');
            }
        })
        .catch((err) => {
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
        });
});

router.post('/login',[
    check('uname', 'Username does not exist').exists(),
    check('pword', 'Password does not exist').exists()
    ], (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty() == false) {
        errorPrint("One of the fields is empty!");
        req.flash('error', 'One or both of the fields is empty!');
        res.redirect('/login');
        return;
    }

    let username = req.body.uname;
    let password = req.body.pword;

    UserModel.authenticate(username, password)
        .then((loggedUserId) => {
            if (loggedUserId > 0) {
                successPrint(`User ${username} is logged in`);
                req.session.username = username;
                req.session.userId = loggedUserId;
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
                res.redirect('/login');
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
