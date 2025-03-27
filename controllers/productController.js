const axios=require('axios');
const API='http://localhost:3003/products'; //json server url

//get all products from api
const getAllProducts=async (_,res)=>{
    //console.log('this is get all products');
    try{
        const response=await axios.get(API);
        res.status(200).json(response.data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
//get specific post by id
const getProductById=async (req,res)=>{
    //console.log('this is get products by id');
    try{
        const productId=req.params.id;
        const response=await axios.get(`${API}/${productId}`);
        return res.status(200).json(response.data);
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "product not found" });
        }
        res.status(500).json({error:err.message});
    }
}
const createProduct=async (req,res)=>{
    // console.log('this is create product');
    // console.log('req body:',req.body);
    try{
        const title=req.body.title;
        const desc=req.body.description;
        const price=req.body.price;
        const stock=req.body.stock;
        const image=req.body.image;
        if(!title || !desc || !price || !stock || !image){
            return res.status(400).json({error:"All fields are required"});
        }
        const newProduct={
            title:title,
            description:desc,
            price:price,
            stock:stock,
            image:image
        }
        const response=await axios.post(API,newProduct);
        res.status(201).json({
            success:"Product created successfully",
            data:response.data
        })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
const updateProduct=async (req,res)=>{
    // console.log('this is update product');
    // console.log('req body:',req.body);
    try{
        const productId=req.params.id;
        let response=await axios.get(`${API}/${productId}`);
        const newProduct={...response.data,...req.body};
        response=await axios.put(`${API}/${productId}`,newProduct);
        res.status(200).json({
            success:"Product updated successfully",
            data:response.data
        })
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(500).json({error:err.message});
    }
}
const deleteProduct=async (req,res)=>{
    try{
        const productId=req.params.id;
        await axios.delete(`${API}/${productId}`);
        res.status(200).json({message:"Product deleted successfully"});
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Poduct not found" });
        }
        res.status(500).json({error:err.message});
    }
}
module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
