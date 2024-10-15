import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECERET
});
const cloudinaryPhotoLink = async (photoPath) =>{
    try {
      const cloudPhotoLink = await cloudinary.uploader.upload(photoPath, {resource_type:'auto'});
      return cloudPhotoLink;
    } catch (error) {
        console.log("There is some issues in your cloud photo uploader ", error);
    }
}
export default cloudinaryPhotoLink;