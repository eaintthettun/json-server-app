const express=require('express');
const router=express.Router();
const orderController=require('../controllers/orderController.js');
const auth = require('../middleware/auth.js'); //token

router.get('/',orderController.getAllOrders); //api/orders
router.get('/:id',orderController.getOrderById); //api/orders/5
router.post('/',auth,orderController.createOrder); //this is create order method
router.put('/:id',auth,orderController.updateOrder); //update order
router.delete('/:id',auth,orderController.deleteOrder);

module.exports=router;