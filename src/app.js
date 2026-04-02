import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express()


//cors middleware 
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,    // Allow requests only from this origin
        credentials:true                // Allow cookies and credentials to be sent
    })
)


//common middlewares from express
app.use(express.json({limit:"16kb"}));  // to parse json data
app.use(express.urlencoded({extended:true,limit:"16kb"}))       // to parse urlencoded data
app.use(express.static("public"))  // to serve static files from public folder
app.use(cookieParser())           // to parse cookies


//import routes
import healthcheckRouter from './routes/healthcheck.routes.js';

//routes
app.use("/api/v1/healthcheck",healthcheckRouter);
export {app}