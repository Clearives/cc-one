var mongoose = require('mongoose');
var timestamps = require('mongoose-time');
var Schema = mongoose.Schema;
var models = require("./model");
for (var m in models) {
  mongoose.model(m, new Schema(models[m]).plugin(timestamps()), m);
}
module.exports = {
  getModel: function(type) {
    return _getModel(type);
  }
};
var _getModel = function(type) {
  return mongoose.model(type);
};
