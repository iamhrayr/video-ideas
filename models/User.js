const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    googleId: {
        type: String
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    image: String,
    firstName: String,
    lastName: String,
    password: {
        type: String,
        select: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// hash passowrd before saving
UserSchema.pre('save', function(next){
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

mongoose.model('users', UserSchema);