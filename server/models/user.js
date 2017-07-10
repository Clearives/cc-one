const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
})

userSchema.statics = {

};

mongoose.model('user', userSchema, 'user');
