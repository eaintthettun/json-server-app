const axios=require('axios');
const API='http://localhost:3003/posts'; //json server url

//get all posts from api
const getAllPosts=async (_,res)=>{
    //console.log('this is get all posts');
    try{
        const response=await axios.get(API);
        res.status(200).json(response.data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
//get specific post by id
const getPostById=async (req,res)=>{
    //console.log('this is get posts by id');
    try{
        const postId=req.params.id;
        const response=await axios.get(`${API}/${postId}`);
        return res.status(200).json(response.data);
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(500).json({error:err.message});
    }
}
const createPost=async (req,res)=>{
    // console.log('this is create post');
    // console.log('req body:',req.body);
    try{
        if(!req.body.title || !req.body.content || !req.body.userId){
            return res.status(400).json({error:"All fields are required"});
        }
        const newPost={
            title:req.body.title,
            content:req.body.content,
            userId:req.body.userId
        }
        const response=await axios.post(API,newPost);
        res.status(201).json({
            success:"Post created successfully",
            data:response.data
        })
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
const updatePost=async (req,res)=>{
    // console.log('this is update post');
    // console.log('req body:',req.body);
    try{
        const postId=req.params.id;
        let response=await axios.get(`${API}/${postId}`);
        const newPost={...response.data,...req.body};
        response=await axios.put(`${API}/${postId}`,newPost);
        res.status(200).json({
            success:"Post updated successfully",
            data:response.data
        })
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(500).json({error:err.message});
    }
}
const deletePost=async (req,res)=>{
    try{
        const postId=req.params.id;
        await axios.delete(`${API}/${postId}`);
        res.status(200).json({message:"Post deleted successfully"});
    }catch(err){
        if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(500).json({error:err.message});
    }
}
module.exports={
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
