var express = require('express');
var router = express.Router();
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');
var PostModel = require('../models/Posts');
const { route } = require('.');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    },
});

var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single("uploadImage"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.ptitle;
    let description = req.body.pdescription;
    let fk_userId = req.session.userId;

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
            return PostModel.create(title, description, fileUploaded, destOfThumbnail, fk_userId);
        })
        .then((postWasCreated) => {
            if (postWasCreated) {
                req.flash('success', 'Your post was created successfully!');
                res.json({ status: "OK", message: "post was created", "redirect": "/" });
            }
            else {
                throw new PostError("Post could not be created!!", "/postImage", 200);
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
        });
});

//localhost:3000/posts/search?search=value
router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                resultsStatus: "info",
                message: "No search term given",
                results: []
            });
        }
        else {
            let results = await PostModel.search(searchTerm);
            if (results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            }
            else {
                let results = await PostModel.getNRecentPosts(8);
                res.send({
                    message: "No results were found for your search but here are the 8 most recent posts",
                    results: results
                });
            }
        }
    }
    catch (err){
        next(err);
    }
});

module.exports = router;