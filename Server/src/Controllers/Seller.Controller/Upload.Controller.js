
import { imageuploader } from "../../Middleware/Image.multer.js";
import ApiResponse from "../../Utils/ApiResponse.js";

export const Upload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const url = `data:${file.mimetype};base64,${b64}`;
      const result = await imageuploader(url);
      uploadedImages.push(result.secure_url);
    }

    return res.status(200).json(new ApiResponse(201, uploadedImages, "Uploaded images successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(401, error, "Cannot upload images"));
  }
};

