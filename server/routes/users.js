const express = require('express');
const users = require('../controllers/users');

const router = express.Router();

// // routes
router.get('/', users.get);
router.put('/', users.put);
router.delete('/', users.delete);

module.exports = router;
