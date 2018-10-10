const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan')
const cookieSession = require('cookie-session');
const session = require('express-session');
const keys = require('./configs/keys'); 
const path = require('path');

// Connect to the MongoDB
// TODO: transfer Mongo URI to the config file
mongoose.connect('mongodb://root:123456@ds263847.mlab.com:63847/video-ideas-dev', () => {
    console.log('Connected to the MongoDB');
});

// Define express app
const app = express();

// Load models
require('./models/User');
require('./models/Idea');
require('./models/Comment');

// Load routes
const indexRoutes = require('./routes/index');
const ideasRoutes = require('./routes/ideas');
const authRoutes = require('./routes/auth');



// Middlewares
// bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
// Cookie session
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.secret]
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// log activity with morgan
app.use(morgan('dev'));
// TODO: uploads should not be public
app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use('/uploads/', express.static(path.join(__dirname, '/uploads')));
// app.get('/*', function(req, res) {
//     res.sendFile(__dirname + '/client/build/index.html');
// })
// allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// passportjs config
require('./configs/passport')(passport);



// Execute routes
app.use('/api', indexRoutes);
app.use('/api', ideasRoutes);
app.use('/api', authRoutes);


// Start server on the given port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is started on the port', port);
});