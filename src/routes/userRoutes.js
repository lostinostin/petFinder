var express = require('express');
var userRouter = express.Router();
var passport = require('passport');

userRouter.post('/Login', passport.authenticate('local-login', {
	successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// userRouter.get('/Signup', function(req,res){
// 	res.render('signup.ejs', {message: req.flash('signupMessage')});
// });

userRouter.post('/Signup', passport.authenticate('local-signup', {
	sucessRedirect: '/profile',
	failureRedirect: '/Signup',
	failureFlash: true //allows for flash msg
}));

userRouter.get('/Profile', isLoggedIn, function(req,res){
	res.render('profile.ejs',{
		user: req.user
	});
});

//logout
userRouter.get('/Logout', function(req,res){
	req.logout();
	res.redirect('/');
});

//middleware to see if user logged in
function isLoggedIn(req, res){
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

	// app.get('/Signup', function(req,res){
	// 	res.render('signup.ejs', {message: req.flash('signupMessage')});
	// });

	// app.post('/Signup', passport.authenticate('local-signup', {
	// 	sucessRedirect: '/Profile',
	// 	failureRedirect: '/Signup',
	// 	failureFlash: true //allows for flash msg
	// }));

	// app.get('/Profile', isLoggedIn, function(req,res){
	// 	res.render('profile.ejs',{
	// 		user: req.user
	// 	});
	// });

	// //logout
	// app.get('/Logout', function(req,res){
	// 	req.logout();
	// 	res.redirect('/');
	// });

//middleware to see if user logged in
// function isLoggedIn(req, res){
// 	if (req.isAuthenticated())
// 		return next();
// 	res.redirect('/');
// }

module.exports = userRouter;









// //User Routes
// var express             = require('express');
// var methodOverride      = require('method-override');
// var bodyParser          = require('body-parser');
// var models              = require('./../../models');
// var User           		= express.Router();
// models.users.sync();

// //Using express to require a login

// function requireLogin(req, res, next) {
// 	  if (req.session.loggedIn) {
// 	    next(); // allow the next route to run
// 	  } else {
// 	    // require the user to log in
// 	    res.redirect("/login"); // or render a form, etc.
// 	  }
// 	}

// 	// Automatically apply the `requireLogin` middleware to all
// 	// routes starting with `/admin`
// 	app.all("/admin/*", requireLogin, function(req, res, next) {
// 	  next(); // if the middleware allowed us to get here,
// 	          // just move on to the next route handler
// 	});

// 	app.get("/admin/profile", function(req, res) {
// 	  // if we got here, the `app.all` call above has already
// 	  // ensured that the user is logged in
// 	});


// //Using sequelize to create a User table, new users, and even authenticate users.

// //============================================================================
// //
// //		THIS PART MAY BE UNNECESSARY
// //
// //============================================================================

// var Sequelize 	= require('sequelize');
// var sha2		=require('sha2');
// var config    	= require(__dirname + '/../config/config.json')[env];

// var sequelize = new Sequelize(config.database, config.username, config.password, config);/*, {
// //   dialect: 'mysql',
// //   storage: "/path/to/database.sqlite"
// // });*/
// //============================================================================
// //============================================================================
// //============================================================================



// //INSTEAD OF WRITING WHAT'S BETWEEN THE BORDERS RUN THE CLI TO CREATE THE MODEL;
// //	here's the cli: sequelize model:create --name User --attributes 'username:string, email:string, password:string(40)'

// 	// TODO //
// 	//		//
// 	//		//
// 	//======//

// 	//ADD A HASH FUNCTION ON THE 
// 	//PASSWORD ATTRIBUTE IN THE MIGRATIONS FILE
// //============================================================================
// //============================================================================

// var User = sequelize.define('User', 
// {
//   username: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING
// })

// User.sync();
// //============================================================================
// //============================================================================



// var user = User.create({ username: req.body.user, email:req.body.email, password: req.body.password }).then(function(){
// 	res.redirect('/')

// 	var passport = require('passport');
// 	var LocalStrategy = require('passport-local').Strategy;

// 	// Serialize sessions
// 	//NOT SURE IF THIS GOES HERE
// 	//INTENTION: TO SERIALIZE USER DATA
// 	passport.serializeUser(function(user, done) {
// 	  done(null, user.id);
// 	});

// 	passport.deserializeUser(function(id, done) {
// 	  db.User.find({where: {id: id}}).success(function(user){
// 	    done(null, user);
// 	  }).error(function(err){
// 	    done(err, null);
// 	  });
// 	});

// 	// Use local strategy to create user account
// 	passport.use(new LocalStrategy(
// 	  function(username, password, done) {
// 	    User.find({ where: { username: username }}).success(function(user) {
// 	      if (!user) {
// 	        done(null, false, { message: 'Unknown user' });
// 	      } else if (password != user.password) {
// 	        done(null, false, { message: 'Invalid password'});
// 	      } else {
// 	        done(null, user);
// 	      }
// 	    }).error(function(err){
// 	      done(err);
// 	    });
// 	  }
// 	));

// });



// //============================================================================
// //
// //		THIS IS ALL EXPERIEMENTAL/MAY BE USEFUL
// //
// //============================================================================




// //signup route
// // var sha2 = require('sha2');
// // router.post('/auth/signUp', function(req,res){
// // 	models.users.create({
// // 		user: req.body.userName,
// // 		password: sha2(req.body.password);
// // 	}).then(function(){
// // 		res.redirect('/Admin');
// // 	})
// // });




// var router = function(nav) {

//     var sha2 = require('sha2');
// 	User.post('/auth/signUp', function(req,res){
// 		models.users.create({
// 			user: req.body.userName,
// 			password: sha2(req.body.password);
// 		}).then(function(){
// 			res.redirect('/Admin');
// 		})
// 	});

// 	User.get('/auth/signIn', function(req, res){
// 		router.param('id', function (req, res, next, id) {  
//  		  var user = user.find({ _id: id }); 
// 		  if (user) { 
// 		      req.user = user;
// 		  } else { 
// 		      next(new Error('User not found'));
// 		   }
// 		  next();
// 		});
// 	})

// }

// module.exports = router;

// //both users with and without profiles will be counted. Adding a where clause to the include automatically makes it required:
// User.findAndCountAll({
//   include: [
//      { model: Profile, where: { active: true }}
//   ],
//   limit: 3
// });

// //============================================================================
// //============================================================================
