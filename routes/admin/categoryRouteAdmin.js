const express = require('express');

const router = express.Router();

const { createCategory, getAll, getById, update, deleteCategory } = require('../../controllers/categoryController');

const upload = require('../../middlewares/fileupload');    

router.post('/', upload.single("image"), createCategory);
router.get('/', getAll); 
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteCategory);

module.exports = router;