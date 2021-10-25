const express = require('express');
const reviews = require('../controllers/reviews');

const router = express.Router();

router.get('/', reviews.get);
router.post('/', reviews.post);
router.delete('/', reviews.delete);

module.exports = router;
