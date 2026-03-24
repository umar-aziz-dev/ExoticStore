import express from "express"
import { AddPolicy, deletePolicy, editPolicy, fetchPolicy } from "../../Controllers/SuperAdmin.Controller/Policy.Controller.js";

const router=express.Router();

router.post("/add",AddPolicy);
router.get("/get",fetchPolicy);
router.delete("/delete/:id",deletePolicy);
router.put("/edit/:id",editPolicy);

export default router;