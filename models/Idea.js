const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'public'
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    ideaImage: String
});

mongoose.model('ideas', IdeaSchema);