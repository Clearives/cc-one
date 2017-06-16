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

userSchema.statics = {

};

mongoose.model('user', userSchema, 'user');
