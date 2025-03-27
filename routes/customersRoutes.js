const express=require('express');
const router=express.Router();
const customerController=require('../controllers/customerController.js');
const auth = require('../middleware/auth.js'); //token

router.get('/',customerController.getAllCustomers); //api/customers
router.post('/',auth,customerController.createCustomer); //api/customers/
router.get('/:id',customerController.getCustomerById); //api/customers/3
router.put('/:id',customerController.updateCustomer); //api/customers/3 (put method for update)
router.delete('/:id',customerController.deleteCustomer); 

module.exports=router;