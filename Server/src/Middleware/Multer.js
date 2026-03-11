import cloudinary from "../Utils/Cloudinary.js";
import multer from "multer";

const storage = multer.memoryStorage();

export const imageuploader = async (file) => {
  try {
    const image = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return image;
  } catch (error) {
    console.log(error);
  }
};

export const upload = multer({ storage });