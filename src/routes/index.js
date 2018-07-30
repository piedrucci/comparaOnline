const express = require('express');
const router = express.Router();

const mainController = require('../controllers/MainController');

router.get('/', mainController.proccessProducts);

module.exports = router;