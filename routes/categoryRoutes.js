const express = require('express');

const router = express.Router();

const { createCategory, getAll, getById, update, deleteCategory } = require('../controllers/categoryController');

const upload = require('../middlewares/fileupload');    

router.post('/create', upload.single("image"), createCategory);
router.get('/getAll', getAll); 
router.get('/getById/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteCategory);

module.exports = router;