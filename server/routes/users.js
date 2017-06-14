const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/login', userCtrl.login)
router.post('/register', userCtrl.register)
router.get('/user/admin', userCtrl.getAllUsers)

module.exports = router;
