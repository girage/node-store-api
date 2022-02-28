const express = require('express');
const router = express.Router();
const { getAllProductsStatic, getAllProducts } = require('../controller/products');



router.use('/static', getAllProductsStatic);
router.use('/all', getAllProducts);

module.exports = router;