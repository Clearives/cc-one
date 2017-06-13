var express = require('express');
var router = express.Router();
var dbs = require('../models/dbs');
var post = dbs.getModel('post');

router.post('/create', (req, res, next) => {
  post.create(req.body, (err) => {
    if (err)
      return console.log(err)
    res.send({ code: 200, msg: '发布成功' });
  })
})

module.exports = router;
