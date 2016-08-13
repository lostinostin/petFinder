//things we need
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

module.exports = function(passport){
	//serialize for session
	passport.serializeUser(function(user,done){
		done(null, user.id);
	});
	//deserialize
	passport.deserializeUser(function(id,done){
		models.User.findOne({where:{id: id}}, function(err,user){
			done(err,user);
		});
	});
	console.log("I'm SET")
	passport.use('local-signup', new LocalStrategy({
		//overrides username field with email
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
		},
		function(req,email,password,done){
			process.nextTick(function(){
				
				models.User.findOne({where:{'email': email}}).then(function(user){
					console.log("THIS IS MY USER:",user)
					
					if (user){
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					}

					models.User.create({
						email: email,
						password: password
					}).then(function(data){
						console.log(data)
						return done(null, data);
					});
				}).catch(function(err){
					if (err) return done(err);
				});
			});
	}));

	passport.use('local-login', new LocalStrategy({
	        // by default, local strategy uses username and password, we will override with email
	        usernameField : 'email',
	        passwordField : 'password',
	        passReqToCallback : true // allows us to pass back the entire request to the callback
	    },
	    function(req, email, password, done) { // callback with email and password from our form
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        	process.nextTick(function(){

        		models.User.findOne({where:{'email': email}}).then(function(err, user){
	            	// if there are any errors, return the error before anything else
	            	// if no user is found, return the message
	            	if (!user)
	                	return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
	            	// if the user is found but the password is wrong
	            	if (!user.validPassword(password))
	                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

	            	// all is well, return successful user
	            	return done(null, user);
	        	}).catch(function(err){
	        		if (err) return done(err);
	        	});
        	});
	        
		}));
};
