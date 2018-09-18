const express = require('express');
const createError = require('http-errors');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const favicon = require('serve-favicon');
const history = require('connect-history-api-fallback');

// const indexRouter = require('../routes/index');
// const projectRouter = require('../routes/project');
// const authRouter = require('../routes/auth');
// const userRouter = require('../routes/user');

const config = require('./config');

module.exports = function() {
	// Initialize express app
  const app = express();
  app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

  //Set up default mongoose connection
  const mongoDB = config.db;
  mongoose.connect(mongoDB, {useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  const db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  require('./config/passport')(passport); // pass passport for configuration
  app.use(cookieParser());

  // required for passport
  app.use(session({
    secret: config.secret, // session secret
    resave: true,
    saveUninitialized: true,
		store: new mongoStore({
			mongooseConnection: db
		})
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Use helmet to secure Express headers
  app.use(helmet());
  app.disable('x-powered-by');


  app.get('/hihi', function (req, res) {
    res.send('hello world')
  });

  require('./routes')(app, passport);
  // app.use('/api/', indexRouter);
  // app.use('/api/auth', authRouter);
  // app.use('/api/user', userRouter);
  // app.use('/api/project', projectRouter);

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));
    // Disable views cache
    app.set('view cache', false);
    app.use(favicon(path.join(__dirname, '../client/static', 'favicon.ico')));
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';

    app.use(favicon(path.join(__dirname, '../dist/static', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, '../dist')));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });
  }

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(res.locals.message);
    console.log(res.locals.error);
    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });

  app.use(history());

  return app;
};
