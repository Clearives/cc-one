var express = require('express');
var router = express.Router();
var user = require('./users');
var post = require('./post');


module.exports = (app) => {
  app.use('/', user);
  app.use('/', post);

}
