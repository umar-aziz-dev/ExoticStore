import express from "express";
import { fetchAllProduct, fetchSingleProduct } from "../../Controllers/User.Controlller/UserProduct.Controller.js";

const router = express.Router();

router.get("/get",fetchAllProduct);
router.get("/product/get/:id",fetchSingleProduct);


export default router;