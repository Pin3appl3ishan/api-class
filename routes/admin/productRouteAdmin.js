const express = require('express');
const router = express.Router();

const { createProduct, getProducts } = require('../../controllers/admin/productManagement');

router.post('/create', createProduct);
router.get('/getAll', getProducts);  
router.get('/getById/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteProduct);

module.exports = router;