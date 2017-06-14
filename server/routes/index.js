const express = require('express');
const router = express.Router();
const user = require('./users');
const post = require('./post');

module.exports = (app) => {
  app.use('/', user);
  app.use('/', post);
}
