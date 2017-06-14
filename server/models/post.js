const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  classify: { type: "string" },
  title: { type: 'string' },
  content: { type: 'string' },
  contentToMark: { type: 'string' }
})

postSchema.statics = {

};

mongoose.model('post', postSchema, 'post');
