import express from "express"
import { AddContact, deleteContact, fetchContact } from "../../Controllers/SuperAdmin.Controller/Contact.Controller.js";

const router = express.Router();

router.post("/add",AddContact);
router.get("/get",fetchContact);
router.delete("/delete",deleteContact);

export default router;