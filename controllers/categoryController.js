const axios=require('axios');
const { response } = require('express');
const API='http://localhost:3003/categories'; //json server url

const getAllCategories=async (_,res)=>{
    //console.log('this is get all categories')
    try{
        const response=await axios.get(API);
        res.status(200).json(response.data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

const getCategoryById=async (req,res)=>{
    try{
        const categoryId=req.params.id;
        const response=await axios.get(`${API}/${categoryId}`);
        return res.status(200).json(response.data);
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(500).json({error:err.message});
    }
}

const createCategory=async (req,res)=>{
    try{
        if(!req.body.id || !req.body.name){
            return res.status(400).json({error:"All fields are required"});
        }
        const newCategory={
            id:req.body.id,
            name:req.body.name,
        }
        const response=await axios.post(API,newCategory);
        res.status(201).json({
        "success":"Category created successfully",
        data:response.data
        });
    }catch(err){
            res.status(500).json({error:err.message});
    }
}

const updateCategory=async (req,res)=>{
    try{
        const categoryId=req.params.id;
        let response=await axios.get(`${API}/${categoryId}`);

        const newCategory={...response.data,...req.body};
        response=await axios.put(`${API}/${categoryId}`,newCategory);
        res.status(200).json({
            "success":"Category updated successfully",
            data:response.data
        });
    }catch(err){
        if(err.response && err.response.status===404){
            return res.status(404).json({error:"Category not found"});
        }
        res.status(500).json({error:err.message});
    }
}

const deleteCategory=async (req,res)=>{
    //console.log('this is delete category');
    try{
        const categoryId=req.params.id;
        await axios.delete(`${API}/${categoryId}`);
        res.status(200).json({
        "success":"Category deleted successfully"});
    }catch(err){
        if(err.response && err.response.status===404){
            return res.status(404).json({error:"Category not found"});
        }
        res.status(500).json({error:err.message});
    }
}

module.exports={
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}