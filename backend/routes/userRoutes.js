const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');

router.get('/', labController.getLabs)
router.get('/:id', labController.getLabsById)

module.exports = router;