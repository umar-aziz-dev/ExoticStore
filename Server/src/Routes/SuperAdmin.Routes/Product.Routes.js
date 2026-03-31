import express from "express"
import { fetchAvailableProduct, fetchSoldProduct } from "../../Controllers/SuperAdmin.Controller/Product.Controller.js";

const router = express.Router();

router.get("/soldaccount",fetchSoldProduct);
router.get("/availableaccount",fetchAvailableProduct);

export default router;