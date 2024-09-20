import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


async function uploadImage(req) {
  try {
    // Upload an image
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    console.log(result);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(result.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect ratio
    const autoCropUrl = cloudinary.url(result.public_id, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);

    return result; 
  } catch (error) {
    console.error(error);
  }
}


export const remove = async (req, res) => {
  
};
