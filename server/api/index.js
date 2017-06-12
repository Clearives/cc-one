
var user = require('../models/dbs').getModel('user');

module.exports = {
  getUser: function() {
    return user.find().sort({_id: -1}).exec();
  }
}
