const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  userid: { type: String, required: true },
  password: { type: String, required: true }
})

userSchema.statics = {

};

mongoose.model('user', userSchema, 'user');
