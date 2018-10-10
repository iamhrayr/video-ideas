const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

// Load User model
const User = mongoose.model('users');

module.exports = (passport) => {
    // Jwt Strategy
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: keys.secret
    }, (jwt_payload, done) => {
        User.findOne({
            _id: jwt_payload._id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    // Local strategy
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Match password
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    // TODO: I think there will be better solution to wxclude password
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password Incorrect' });
                }
            });
        }).catch(err => {
            return done(err);
        })
    }));

    // Google Strategy
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/api/auth/google/callback"
        }, (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id})
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({
                            googleId: profile.id,
                        }).save().then(user => {
                            done(null, user); 
                        });
                    }
                })
        })
    );

    // Serialize & deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}