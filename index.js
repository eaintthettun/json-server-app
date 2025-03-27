const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const authRoutes=require('./routes/authRoute');
const postsRoutes=require('./routes/postsRoutes');
const customersRoutes=require('./routes/customersRoutes');
const categoriesRoutes=require('./routes/categoriesRoutes');
const productsRoutes=require('./routes/productsRoutes');
const ordersRoutes=require('./routes/ordersRoutes');

app.use(express.json()); //carry req.body data
//api call
app.use('/api/auth',authRoutes); //localhost:3000/api/auth 
app.use('/api/posts',postsRoutes);
app.use('/api/customers',customersRoutes);
app.use('/api/categories',categoriesRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/orders',ordersRoutes);

const PORT=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});