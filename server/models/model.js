module.exports = {
  user: {
    userid: { type: String, required: true },
    password: { type: String, required: true }
  },
  post: {
    classify: { type: "string" },
    title: { type: 'string' },
    content: { type: 'string' },
    contentToMark: { type: 'string' }
  }
};

// module.exports.post.index({_id:1,classify:-1}).exec();
