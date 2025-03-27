const express=require('express');
const router=express.Router();
const categoryController=require('../controllers/categoryController.js');
const auth = require('../middleware/auth.js'); //token

router.get('/',categoryController.getAllCategories); //api/categories
router.post('/',auth,categoryController.createCategory);
router.get('/:id',categoryController.getCategoryById); 
router.put('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory); 

module.exports=router;