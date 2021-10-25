const express = require('express');
const auth = require('../controllers/auth');

const router = express.Router();

// // routes
router.get('/logout', auth.logout);
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.post('/refresh', auth.refresh);

module.exports = router;
