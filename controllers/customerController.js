const axios=require('axios');
const { response } = require('express');
const API='http://localhost:3003/customers'; //json server url

const getAllCustomers=async (_,res)=>{
    console.log('this is get all customers')
    try{
        const response=await axios.get(API);
        res.status(200).json(response.data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const getCustomerById=async (req,res)=>{
    try{
        const customerId=req.params.id;
        const response=await axios.get(`${API}/${customerId}`);
        return res.status(200).json(response.data);
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.status(500).json({error:err.message});
    }
}

//axios.post(API,newPost);
const createCustomer=async (req,res)=>{
    try{
        if(!req.body.id || !req.body.name || !req.body.age || !req.body.email || !req.body.phone || !req.body.address){
            return res.status(400).json({error:"All fields are required"});
        }
        const newCustomer={
            id:req.body.id,
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address
        }
        const response=await axios.post(API,newCustomer);
        res.status(201).json({
            "success":"Customer created successfully",
            data:response.data
        })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

//axios.put(`${API}/${postId}`,newPost);
const updateCustomer=async (req,res)=>{
    //console.log('this is update customer');
    try{
        const customerId=req.params.id;
        let response=await axios.get(`${API}/${customerId}`);

        const newCustomer={...response.data,...req.body};
        response=await axios.put(`${API}/${customerId}`,newCustomer);
        res.status(200).json({
            "success":"Customer updated successfully",
            data:response.data
        });
    }catch(err){
        if(err.response && err.response.status===404){
            return res.status(404).json({error:"Customer not found"});
        }
        res.status(500).json({error:err.message});
    }
}

//axios.delete(`${API}/${postId}`);
const deleteCustomer=async (req,res)=>{
    //console.log('this is delete customer');
    try{
        const customerId=req.params.id;
        await axios.delete(`${API}/${customerId}`);
        res.status(200).json({
        "success":"Customer deleted successfully"});
    }catch(err){
        if(err.response && err.response.status===404){
            return res.status(404).json({error:"Customer not found"});
        }
        res.status(500).json({error:err.message});
    }
}

module.exports={
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}