const mongoose = require('mongoose');
const Post = mongoose.model('post');

module.exports = {
  // getAllPosts: (req, res) => {
  // 	console.log(req.query)
  //   Post.find().then((post) => {
  //     res.send({ code: 200, msg: 'succ', data: post });
  //   });
  // },
  getAllPosts: (req, res) => {
    Post.add().then((post) => {
      res.send({ code: 200, msg: 'succ', servertTime:new Date().getTime(),  data: post });
    });
  },
  createPost: (req, res, next) => {
    Post.create(req.body, (err) => {
      if (err)
        return console.log(err)
      res.send({ code: 200, msg: '发布成功' });
    })
  }
};
