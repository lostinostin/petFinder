var express = require('express');
var http = require('http');
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

// Handles the login
//var loginRouter = require('./src/routes/loginRoutesj.js')(nav);
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
//app.use('')


app.get('/petFinder', function(req,res) {

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