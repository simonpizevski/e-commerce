import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Din Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Din API-nyckel
    api_secret: process.env.CLOUDINARY_API_SECRET, // Din API-hemlighet
});

export async function uploadImage(file: string): Promise<string> {
    const result = await cloudinary.uploader.upload(file, {
        folder: "products",
    });
    return result.secure_url;
}

export default cloudinary;