const auth = require('./auth');
const user = require('./user');

module.exports = function(app, passport) {
  // Index page
	app.get('/api', isLoggedIn, function(req, res) {
		res.json('hi');
	});

	app.use('/api/auth/', auth(passport));
	app.use('/api/user/', user(passport, isLoggedIn));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.status(401).json('Login');
}
