import express from "express"
import { CreateAdmin, DeleteAdmin, FetchAdmin } from "../../Controllers/SuperAdmin.Controller/SuperAdmin.Controller.js";


const router = express.Router();

router.post("/add",CreateAdmin);
router.post("/delete/:id",DeleteAdmin);
router.get("/get",FetchAdmin);

export default router;