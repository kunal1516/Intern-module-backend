const express = require('express');
const connectToMongo=require('./config/db');
//const { log } = require('console');
const app=express();

require('dotenv').config();
app.use(express.json());
const port = process.env.PORT ||6000;
const register = require('./controller/userCtrl');
connectToMongo();
//app.use('/api/user',require("./router/userRoute"))

app.get("/",(req,res)=>{
    res.send("<h1>hiiiiiiiiiiiiiiiiiiiiiiii</h1>");
})

app.use('/api/user',register)

app.listen(port,()=>{
    console.log(`Server is running at port:${port}`);
})


//i changed something