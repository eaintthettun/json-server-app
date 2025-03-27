const bcrypt=require('bcryptjs');
const axios=require('axios');
const { generateToken } = require('../utils/jwt');
const API='http://localhost:3003/users'; //json-server-port

const register=async (req,res)=>{
    console.log('hello register method console');
    const {username,email,password}=req.body;
    try{
        const existingUsers=await axios.get(API); //check user
        console.log(existingUsers.data); //return array
        const user=existingUsers.data.find(u=>u.email===email);
        if(user){
            return res.status(400).json({message:'User already exist'});
        }
        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        //create user
        const newUser={
            username,
            email,
            password:hashedPassword
        };
        await axios.post(API,newUser);
        res.status(500).json({message:'User registered successfully'});
        
    }catch(error){
        res.status(500).json({message:'Error registering user'});
    }
}
//take only email and password in postman
const login=async (req,res)=>{
    //console.log('hello login');
    const {email,password}=req.body;
    console.log(req.body);
    try{
        const existingUsers=await axios.get(API);
        const user=existingUsers.data.find(u=>u.email===email);
        if(!user){
            return res.status(401).json({message:'User not register'});
        }
        //compare password
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(400).json({message:'Email and password do not match'});
        }
        const token=generateToken(user);
        console.log('token:',token);
        return res.send({token});
    }catch(error){
        return res.status(500).json({message:'Error logging in'});
    }

}
module.exports={login,register};