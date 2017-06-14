const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.post('/create', postCtrl.createPost)
router.get('/post/lists', postCtrl.getAllPosts)

module.exports = router;
