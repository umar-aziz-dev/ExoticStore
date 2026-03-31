import express from "express";
import { fetchPolicy } from "../../Controllers/User.Controlller/UserPolicy.Controller.js";

const router = express.Router();

router.get("/get", fetchPolicy);

export default router;