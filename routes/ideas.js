const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const _ = require('lodash');
const multer = require('multer');


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

// Load models
const Idea = mongoose.model('ideas');
const Comment = mongoose.model('comments');

// Post a new idea
router.post('/ideas', upload.single('image'), checkAuth, (req, res) => {
    let newIdea = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user: req.user.id,
        ideaImage: req.file ? req.file.path : ''
    };

    new Idea(newIdea)
        .save()
        .then(idea => {
            res.json(idea);
        })
        .catch(err => {
            res.json(err);
        });
});

// Get all public ideas
router.get('/ideas', (req, res) => {
    Idea.find({status: 'public'}).populate('user comments')
        .then(ideas => {
            res.send(ideas);
        }).catch(err => {
            res.send(err);
        });
});

// Get personal ideas
router.get('/ideas/personal', checkAuth, (req, res) => {
    Idea.find({user: req.user.id})
        .populate('user')
        .then(ideas => {
            res.send(ideas)
        })
        .catch(err => {
            res.send(err);
        });
});

// Get single Idea
// TODO: ensure that private idea can't be accessed by users besides author 
router.get('/ideas/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).populate({
        path: 'user comments',
        populate: {
            path: 'user'
        }
    }).then(idea => {
        res.send(idea);
    }).catch(err => {
        res.send(err);
    });
})

// Edit Idea
router.patch('/ideas/:id', upload.single('image'), checkAuth, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        // ensure that editor is the Author of the idea
        if (idea.user != req.user.id) {
            // If editor is not the author send error
            return res.json({success: false, 'message': 'Not Anuthorized'});
        } else {
            // If editor is the author process to editing
            idea = Object.assign(idea, {
                ...req.body, 
                ideaImage: req.file ? req.file.path : idea.ideaImage // change img if new file uploaded
            });
            idea.save().then(savedIdea => {
                res.send(savedIdea);
            }).catch(err => {
                res.send(err);
            });
        }
    }).catch(err => {
        console.log(err);
    })
});

// Remove Idea
router.delete('/ideas/:id', (req, res) => {
    Idea.findOne({_id: req.params.id})
        .then(idea => {
            // ensure that the Author is trying to delete 
            if (idea.user != req.user.id) {
                // If it is not the author send error
                return res.json({success: false, 'message': 'Not Anuthorized'});
            } else {
                // If it is the author delete it
                Idea.findOneAndRemove({
                    _id: req.params.id
                }).then(() => {
                    res.json({success: true, 'message': 'Done'})
                })
                .catch(err => {
                    res.send(err);
                });
            }
        })
});

// Add comment to the idea
router.post('/ideas/:id/comments', checkAuth, (req, res) => {
    Idea.findOne({_id: req.params.id})
        .then(idea => {
            new Comment({
                user: req.user.id,
                idea: req.params.id,
                body: req.body.comment
            })
                .save()
                .then(comment => {
                    idea.comments.push(comment._id);
                    idea.save();
                    // send back the comment with user data
                    Comment
                        .findOne(comment._id)
                        .populate('user')
                        .then(comment => {
                            res.send(comment);
                        })
                })
                .catch(err => {
                    res.send(err);
                });
        })
    
});

// Get comments of an idea
router.get('/ideas/:id/comments', (req, res) => {
    Comment.find({
        idea: req.params.id
    }).populate('user comments').then(comments => {
        res.send(comments);
    }).catch(err => {
        res.send(err)
    })
});

// Remove comment
router.delete('/ideas/:ideaId/comments/:commentId', checkAuth, (req, res) => {
    Comment.findOne({_id: req.params.commentId})
        .then(comment => {
            // first check if comment exists
            if (!comment) {
                return res.send({success: false, message: 'Comment is not found'});
            }
            // if it exists, ensure the author is trying to delete
            if (comment.user == req.user.id) {
                Idea.findOne({_id: req.params.ideaId})
                    .then(idea => {
                        _.remove(idea.comments, (item) => {
                            return item == req.params.commentId; 
                        });
                        // mark comments as modified
                        idea.markModified('comments')
                        // save changes
                        idea.save().then(() => {
                            res.send({success: true, message: 'Comment successfully deleted!'});
                        }).catch(err => res.send(err));
                    })
                    .catch(err => {
                        res.send(err);
                    });
            } else {
                // if it is not author, response with suitable message
                res.send({success: false, message: 'Not Authorized'});
            }
        })
        .catch(err => {
            res.send(err);
        });
});

module.exports = router;

