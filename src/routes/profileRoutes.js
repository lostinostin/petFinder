var express = require('express');
var profileRouter = express.Router();

var router = function(nav) {

    profileRouter.route('/')
        .get(function(req, res) {
            res.render('profile', {
                title: 'Profile',
                nav: nav,
            });
        });

    return profileRouter;
};

module.exports = router;