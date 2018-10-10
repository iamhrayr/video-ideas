const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String
    },
    created: {
        type: Date,
        default: new Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    idea: {
        type: Schema.Types.ObjectId,
        ref: 'ideas'
    }
});

mongoose.model('comments', CommentSchema);