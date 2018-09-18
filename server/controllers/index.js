let express = require('express');
let router = express.Router();

router.get('/asdf', function (req, res) {
  res.send('Hello Medium.com!!!!');
});


module.exports = router;
