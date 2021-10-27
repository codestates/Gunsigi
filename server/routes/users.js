const express = require('express');
const users = require('../controllers/users');

const router = express.Router();

// // routes
router.get('/', users.get);
router.patch('/', users.patch);
router.delete('/', users.delete);

module.exports = router;
