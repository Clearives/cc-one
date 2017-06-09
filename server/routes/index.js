var express = require('express');
var router = express.Router();
var dbs = require('../models/dbs');
var user = dbs.getModel('user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'cc-blog' });
});

router.get('/user/admin', function(req, res, next) {
    var response = res;
    console.log(req.session)
    user.find({}, function(err, result, res) {
        if(err) return console.log(err)
        response.send(JSON.stringify(result));
    })

});


router.post('/create', (req, res, next) => {
      let newUser = [{
          userid: req.body.userid,
          password: req.body.password
      }]
      user.create(newUser, (err) => {
          if(err) return console.log(err)
          res.send("ok")
      })
  })

  router.post('/login', (req, res, next) => {
        let newUser = [{
            userid: req.body.userid,
            password: req.body.password
        }]
        user.findOne({userid: req.body.userid}, function(err, doc) {
          if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
          }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            res.send({
              code: 404,
              msg: '用户名不存在'
            });                           //    状态码返回404
          }else{

            if(req.body.password != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
              req.session.error = "密码错误";
              res.send({
                code: 404,
                msg: '密码错误'
              });
              //    res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
              req.session.user = doc;
              res.send({
                code: 200,
                msg: '登录成功'
              });
            }
          }
        })
    })

module.exports = router;
