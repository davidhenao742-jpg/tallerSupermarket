const express = require('express');
const router = express.Router();
router.use('/products', require('./productRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/providers', require('./providerRoutes'));
router.use('/sales', require('./saleRoutes'));
router.use('/sale-details', require('./saleDetailRoutes'));
module.exports = router;