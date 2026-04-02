import dotenv from 'dotenv';
import {app} from "./app.js" 
import connectDB from './db/index.js';

//configuring dotenv so that we can use the variables from .env file
dotenv.config({
    path:"./.env"
});

//Now this app can listen on a port
const PORT= process.env.PORT || 8001;
connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT} `)
    }) 
})
    .catch((err)=>{
        console.log("MongoDB connection error",err)
    })