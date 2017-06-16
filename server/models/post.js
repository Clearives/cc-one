const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  classify: { type: "string" },
  title: { type: 'string' },
  content: { type: 'string' },
  contentToMark: { type: 'string' }
})

postSchema.statics = {
  add: function() {
    return this.find((err, doc) => {
      doc.forEach(function(item, i) {
        if (i === 0) {
          console.log(item)
        }
        item.title = '123'
      })
      return doc
    })
  },
  getPost: function() {
    console.log(this.find())
    return this.find()
  }
};

mongoose.model('post', postSchema, 'post');
