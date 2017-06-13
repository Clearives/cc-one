let user = require('../models/dbs').getModel('user');
let post = require('../models/dbs').getModel('post');

module.exports = {
  getUser: function() {
    return user.find().sort({ _id: -1 }).exec();
  },
  getAllPosts: function() {
    return post.find().sort({ _id: -1 }).exec();
  }
};
