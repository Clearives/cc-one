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

module.exports = router;
