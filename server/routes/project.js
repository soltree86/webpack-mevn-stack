const express = require('express');
const router = express.Router();

/* eslint-disable global-require */
const projects = [{
  id: 1,
  title: 'First Project',
  creator: 'james',
  currency: 'sol',
  funded: 10,
  goal: 5,
  type: 'game',
  img: 'img/item-example.jpeg',
  due: '2018-07-20T12:00:00Z',
}, {
  id: 2,
  title: 'Second Project',
  creator: 'ha',
  currency: 'eos',
  funded: 1,
  goal: 5,
  type: 'music',
  img: 'img/item-example2.jpeg',
  due: '2018-08-25T12:00:00Z',
}, {
  id: 3,
  title: 'Thrid Project',
  creator: 'chung',
  currency: 'btc',
  funded: 3,
  goal: 5,
  type: 'art',
  img: 'img/item-example3.jpeg',
  due: '2018-07-25T12:00:00Z',
}, {
  id: 4,
  title: 'Fourth Project',
  creator: 'yeom',
  currency: 'eth',
  funded: 20,
  goal: 5,
  type: 'game',
  img: 'img/item-example2.jpeg',
  due: '2018-07-19T12:00:00Z',
}, {
  id: 5,
  title: 'Fifth Project',
  creator: 'kang',
  currency: 'usd',
  funded: 5,
  goal: 5,
  type: 'art',
  img: 'img/item-example.jpeg',
  due: '2018-07-31T12:00:00Z',
}];
/* eslint-disable global-require */
/* GET home page. */
router.get('/all', function(req, res, next) {
  console.log(projects);
  res.json(projects);
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id
  res.json(projects.find(project => project.id = id));
});

module.exports = router;
