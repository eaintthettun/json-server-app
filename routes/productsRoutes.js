const express=require('express');
const router=express.Router();
const productController=require('../controllers/productController.js');
const auth = require('../middleware/auth.js'); //token

router.get('/',productController.getAllProducts); //api/products
router.get('/:id',productController.getProductById); //api/products/5
router.post('/',auth,productController.createProduct); //this is create Product method
router.put('/:id',auth,productController.updateProduct); //update Product
router.delete('/:id',auth,productController.deleteProduct);

module.exports=router;