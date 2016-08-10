//things we need
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/login');

module.exports = function(passport){
	passport.seralizeUser(function(user,done){
		done(null, user.id);
	});
}

passport.deserializeUser(function(id,done){
	User.findById(id, function(err,user){
		done(err,user);
	});
});