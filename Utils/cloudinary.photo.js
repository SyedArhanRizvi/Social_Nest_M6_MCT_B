import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
import { log } from 'console';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECERET
});
const cloudinaryPhotoLink = async (photoPath) => {
  console.log('Photo path:', photoPath);
  
  if (!photoPath) {
    console.log("No photo path received, returning null");
    return null;
  }

  try {
    const cloudPhotoLink = await cloudinary.uploader.upload(photoPath, { resource_type: 'auto' });
    console.log('Photo uploaded successfully:', cloudPhotoLink);
    fs.unlinkSync(photoPath);
    return cloudPhotoLink;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath); // Ensure file is deleted to avoid clutter
    }
    
    return null;
  }
};

export default cloudinaryPhotoLink;
 