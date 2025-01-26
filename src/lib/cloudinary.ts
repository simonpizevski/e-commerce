import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Din Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Din API-nyckel
    api_secret: process.env.CLOUDINARY_API_SECRET, // Din API-hemlighet
});

export default cloudinary;