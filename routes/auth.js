const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const _ = require('lodash');
const checkAuth = require('../middlewares/check-auth');
const keys = require('../configs/keys');
const router = express.Router();
const multer = require('multer');

const {isEmail} = validator;

// define storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-'); // whindows filename can't contain ":"
        let fn = date + '_' + file.originalname;
        cb(null, fn);
    }
});
const fileFilter = (req, file, cb) => {
    // reject file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Not allowed file'), false);
    }
};
const upload = multer({
    storage, 
    limit: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter
});


// Load Idea model
const User = mongoose.model('users');

// Register a new user
router.post('/auth/register', (req, res) => {
    // simple validation for fields
    const errors = {};
    if (!req.body.email) {
        errors.email = 'Please enter email to register';
    } else if (!isEmail(req.body.email)) {
        errors.email = 'Please enter valid email address';
    }
    if (!req.body.password) {
        errors.password = 'Please enter password to register';
    }
    if (!_.isEmpty(errors)) {
        return res.status(422).send(errors);
    }

    // check if user is already exists
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            errors.email = 'The email address is already registered'
            res.status(422).send(errors);
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            newUser.save()
                .then(user => {
                    res.status(200).send({message: 'You have successfully registered and can login!'})
                })
                .catch(err => {
                    return res.status(500).send(err);
                });
        }
    })
});

// Login with local strategy
router.post('/auth/local', passport.authenticate('local', {failWithError: true}), 
    // success callback
    (req, res, info) => {
        res.send(req.user);
    },
    //failure callback
    (err, req, res, next) => {
        res.json({success: false, message: 'Wrong credentials'});
    }
);

// Login with google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google'), function(req, res) {
    console.log(req.user)
});

// login with jwt
router.post('/auth/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).select('+password').then(user => {
        if (!user) {
            return res.status(400).send({message: 'Wrong credentials'});
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const payload = {
                    _id: user._id, 
                    email: user.email, 
                    created: user.created,
                    googleId: user.googleId,
                    image: user.image,
                    firstName: user.firstName,
                    lastName: user.lastName
                };
                const token = jwt.sign(payload, keys.secret);
                return res.send({
                    ...payload,
                    token: token,
                });
            } else {
                return res.status(400).send({message: 'Wrong credentials'});
            }
        })
    }) 
});

// get current user
router.get('/current_user', checkAuth, (req, res) => {
    res.send(req.user);
});


// Edit current profile
router.patch('/current_user', upload.single('image'), checkAuth, (req, res) => {
    User.findOne({
        _id: req.user._id
    }).then(user => {
        user = Object.assign(user, {
            ...req.body, 
            image: req.file ? req.file.path : user.image
        });
        user.save().then(user => {
            res.send({message: 'Saved Successfully'});
        });
    }).catch(err => {
        res.status(400).send(err);
    })
});

module.exports = router;