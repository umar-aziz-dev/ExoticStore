import express from "express"
import { upload } from "../../Middleware/Image.multer.js";
import { Upload} from "../../Controllers/Seller.Controller/Upload.Controller.js";




const router = express.Router();

router.post("/upload",upload.array("images",5),Upload);

export default router;