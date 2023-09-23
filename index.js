import 'dotenv/config'

import app from "./src/app.js";
import dbConnect from './src/config.js';
import {v2 as cloudinary} from 'cloudinary';

const PORT = process.env.PORT || 5001;

cloudinary.config({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

app.listen(PORT, async()=>{
    await dbConnect();
    console.log(`server is running on ${PORT}`)
})