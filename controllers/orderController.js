const axios=require('axios');
const API='http://localhost:3003/orders'; //json server url

//get all orders from api
const getAllOrders=async (_,res)=>{
    //console.log('this is get all orders');
    try{
        const response=await axios.get(API);
        res.status(200).json(response.data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
//get specific order by id
const getOrderById=async (req,res)=>{
    //console.log('this is get orders by id');
    try{
        const orderId=req.params.id;
        const response=await axios.get(`${API}/${orderId}`);
        return res.status(200).json(response.data);
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "order not found" });
        }
        res.status(500).json({error:err.message});
    }
}
const createOrder=async (req,res)=>{
    // console.log('this is create order');
    // console.log('req body:',req.body);
    try{
        const desc=req.body.description;
        const date=req.body.date;
        const items=req.body.items;
        const totalPrice=req.body.totalPrice;
        if(!desc || !date || !items || !totalPrice){
            return res.status(400).json({error:"All fields are required"});
        }
        const newOrder={
            description:desc,
            date:date,
            items:items,
            totalPrice:totalPrice
        }
        const response=await axios.post(API,newOrder);
        res.status(201).json({
            success:"Order created successfully",
            data:response.data
        })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
const updateOrder=async (req,res)=>{
    // console.log('this is update Order');
    // console.log('req body:',req.body);
    try{
        const orderId=req.params.id;
        let response=await axios.get(`${API}/${orderId}`);
        const newOrder={...response.data,...req.body};
        response=await axios.put(`${API}/${orderId}`,newOrder);
        res.status(200).json({
            success:"Order updated successfully",
            data:response.data
        })
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(500).json({error:err.message});
    }
}
const deleteOrder=async (req,res)=>{
    try{
        const orderId=req.params.id;
        await axios.delete(`${API}/${orderId}`);
        res.status(200).json({message:"Order deleted successfully"});
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(500).json({error:err.message});
    }
}
module.exports={
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}
