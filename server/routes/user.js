const express = require('express');
const router = express.Router();

const User = require('../models/User.js');


module.exports = function(passport, isLoggedIn) {

  /* GET users listing. */
  router.get('/profile', isLoggedIn, function(req, res) {
      if(req.user) {
        req.user.password = 0;
        res.status(200).json({ user: req.user });
      } else {
        console.log("hi");
        res.status(401).json('Invalid User');
      }
    }
  );

  return router;
};
