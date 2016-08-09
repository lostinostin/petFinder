var express = require('express');
var request = require('request');
var app = express();
var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Pets',
    Text: 'Pets'
}, {
    Link: '/Profile',
    Text: 'Profile'
}];
// var profileRouter = require('./src/routes/profileRoutes.js')(nav);
var petRouter = require('./src/routes/petRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
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
// app.use('/Profile', profileRouter);
app.use('/Pets', petRouter);
app.use('/Admin', adminRouter);

app.get('/petFinder', function(req, res) {
    var url = 'http://api.petfinder.com/pet.getRandom?key=9b4604790e9c66428f6c9d46cbd08977&format=json&output=basic';
    request(url, function(err, response, body) {
        // console.log(body);
        // res.json(JSON.parse(body));
    });
}); //this is a proxy to use api

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Adopt!',
        nav: nav
    });
});

// app.get('/Pets', function(req, res) {
//     res.send('hello Pets');
// });
app.listen(port, function(err) {
    console.log('running on port ' + port);
});