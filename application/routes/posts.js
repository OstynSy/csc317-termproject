var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.ptitle;
    let desc = req.body.pdescription;
    let fk_userid = req.session.userId;

    //express validation
    //Server validation
    // make sure title desc and fk are not empty
    //if any values that used for the insert statement
    //are udnefined, mysql.query or execute will fail
    //with the following error
    // BIND parameters cannot be undefined
    //will fail if db.query('',[undefined])

    sharp(fileUploaded)
    .resize(200)
    .toFile(destOfThumbnail)
    .then(() => {
        let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?,?,?,?, now(),?);';
        return db.execute(baseSQL, [title, desc, fileUploaded, destOfThumbnail, fk_userid]);
    })
    .then(([results, fields]) => {
        if (results && results.affectedRows) {
            req.flash('success', 'Your post was created successfully!');
            res.json({ status: "OK", message: "post was created", "redirect": "/"});
        }
        else {
            res.json({status: "OK", message: "post was not created", "redirect": "/postimage" });
        }
    })
    .catch((err) => {
        if (err instanceof PostError) {
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

//localhost:3000/posts/search?search=value
router.get('/search', (req, res, next) => {
    let searchTerm = req.query.search;
    if (!searchTerm) {
        res.send({
            resultsStatus: "info",
            message: "No search term given",
            results: []
        });
    }
    else {
        let baseSQL = "SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack \
        FROM posts \
        HAVING haystack like ?;";
        let sqlReadySearchTerm = "%" + searchTerm + "%";
        db.execute(baseSQL, [sqlReadySearchTerm])
            .then(([results, fields]) => {
                if (results && results.length) {
                    res.send({
                        resultsStatus: "info",
                        message: `${results.length} results found`,
                        results: results
                    });
                }
                else {
                    db.query('select id, title, description, thumbnail, created from posts ORDER BY created LIMIT 8;', [])
                        .then(([results, fields]) => {
                            res.send({
                                resultsStatus: "info",
                                message: "No results were found for your search but here are the 8 most recent posts",
                                results: results
                            })
                        })
                }
            })
        .catch((err) => next(err))
    }
});

module.exports = router;