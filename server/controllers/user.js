const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = {
  getAllUsers: (req, res) => {
    User.find.then((user) => {
      res.send({ code: 200, msg: 'succ', data: user });
    });
  },
  register: (req, res) => {
    let newUser = [{
      userid: req.body.userid,
      password: req.body.password
    }]
    User.findOne({userid: req.body.userid})
        .then((doc, err) => {
          if (err) {
            res.send(500)
          } else if (doc) {
            req.session.error = '用户名已存在';
            res.send({ code: 404, msg: '用户名已存在' });
          } else {
            User.create(newUser, (err) => {
                req.session.user = newUser
                if (err)
                  return console.log(err)
                res.send({ code: 200, msg: '注册成功' });
            })
          }
        })
  },
  login: (req, res) => {
    User.findOne({userid: req.body.userid})
        .then((doc, err) => {
          if (err) {
            res.send(500)
          } else if (!doc) {
            req.session.error = '用户名不存在';
            res.send({ code: 404, msg: '用户名不存在' });
          } else {
            if (req.body.password != doc.password) {
              req.session.error = "密码错误";
              res.send({ code: 404, msg: '密码错误' });
            } else {
              req.session.user = doc;
              res.send({ code: 200, msg: '登录成功' });
            }
          }
        })
  }
};
