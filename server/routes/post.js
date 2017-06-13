var express = require('express');
var router = express.Router();
var api = require('../api');
var dbs = require('../models/dbs');
var post = dbs.getModel('post');

router.post('/create', (req, res, next) => {
  post.create(req.body, (err) => {
    if (err)
      return console.log(err)
    res.send({ code: 200, msg: '发布成功' });
  })
})
router.get('/post/lists', (req, res, next) => {
  api.getAllPosts().then((posts) => {
    res.send({ code: 200, posts })
  }).catch(err => {
    res.send({ code: -200, message: err.toString() })
  })
})

module.exports = router;
