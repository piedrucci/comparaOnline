const express = require('express');
const router = express.Router();

const ProductController = require('./controllers/MainController');

router.get('/', ProductController.proccessProducts);

module.exports = router;