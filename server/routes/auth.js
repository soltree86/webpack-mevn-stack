const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

module.exports = function(passport) {
  router.post('/login', passport.authenticate('local-login'), function(req, res) {
    if(req.user) {
      req.user.local.password = 0;
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json('Invalid User.');
    }
  });
  // LOGOUT ==============================
  router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json('loggout out');
  });

  router.post('/signup', passport.authenticate('local-signup'), function(req, res) {
    if(req.user) {
      req.user.local.password = 0;
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json('Sign Up Failed.');
    }
  });

  return router;
};
