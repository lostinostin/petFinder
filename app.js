//things we need
var express = require('express');
var http = require('http');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('./models/user');
var app = express();
var port = process.env.PORT || 5000;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

//navbar
var nav = [{
    Link: '/Pets',
    Text: 'Pets'
}, {
    Link: '/Profile',
    Text: 'Profile'
}];

//Routes
var petRouter = require('./src/routes/petRoutes.js')(nav);
var profileRouter = require('./src/routes/profileRoutes.js')(nav);
//var adminRouter = require('./src/routes/adminRoutes.js')(nav); stretch goal
var userRouter = require('./src/routes/userRoutes.js');

//Allow styles
app.use(express.static('public'));
// app.use(express.static('src/views'));
app.set('views', './src/views');

// you only need the two things below if you are using handlebars
// var handlebars = require('express-handlebars')
// app.engine('.hbs', handlebars({
//     extname: '.hbs'
// }));

// change .hbs to jade, or ejs if you'd rather use jade or ejs and vice versa
app.set('view engine', 'ejs');
// app.use('/Profile', userRouter);
app.use('/Profile', profileRouter);
app.use('/Pets', petRouter);

//app.use('/Admin', adminRouter);

// app.get('/petFinder', function(req,res) {

//     var emptyVar = '';
//     http.get('http://api.petfinder.com/pet.getRandom?key=9b4604790e9c66428f6c9d46cbd08977&format=json&output=basic', function(data){
//         data.setEncoding('utf8');
//         data.on("data", function(chunk) {
//             emptyVar += chunk;
//             console.log(chunk);
//         });
//     });
// });

//Passport things
require('./config/passport')(passport);
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies for auth
app.use(bodyParser.urlencoded({
    extended: false
})); //get info in html forms
app.use(methodOverride('_method'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '123'
}));
app.use(passport.initialize());
app.use(passport.session()); //persistant login session
app.use(flash()); //for flash messages during session

//whats this down here???
app.get('/petFinder', function(req, res) {

    var emptyVar = '';
    http.get('http://api.petfinder.com/pet.getRandom?key=9b4604790e9c66428f6c9d46cbd08977&format=json&output=basic', function(data){
        data.setEncoding('utf8');
        data.on("data", function(chunk) {
            emptyVar += chunk;
            console.log(chunk);
        });

        data.on("end", function(resdata) {
            var json = JSON.parse(emptyVar);
            // debugger;
            console.log(json);
            res.send(json);
        });
    });
    }); //this is a proxy to use api

//set homepage
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Adopt!',
        nav: nav
    });
});

app.listen(port, function(err) {
    console.log('Magic happening on ' + port);
});

