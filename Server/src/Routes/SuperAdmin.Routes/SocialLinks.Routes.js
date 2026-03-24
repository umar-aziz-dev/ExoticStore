import express from "express"
import { AddSocialLinks, fetchSocialLinks } from "../../Controllers/SuperAdmin.Controller/SocialLinks.Controller.js";



const router = express.Router();

router.post("/add", AddSocialLinks);
router.get("/get", fetchSocialLinks);

export default router;