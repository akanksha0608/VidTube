import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

//configure cloudinary
cloudinary.config({
    cloud_name:processe.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_CLOUD_KEY,
    api_secret:process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null;
        const response=await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:'auto',
            }
        )  
        
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary};