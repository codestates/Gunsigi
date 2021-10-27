const express = require('express');
const bookmarks = require('../controllers/bookmarks');

const router = express.Router();

// routes
router.get('/', bookmarks.get);
router.post('/', bookmarks.post);
router.delete('/', bookmarks.delete);

module.exports = router;
