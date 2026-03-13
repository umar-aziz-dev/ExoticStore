import express from "express";
import { UpdateStatus } from "../../Controllers/Seller.Controller/Product.Controller.js";
import { fetchSingleSoldProduct, fetchSoldProducts } from "../../Controllers/Seller.Controller/SoldProduct.Controller.js";


const router = express.Router();

router.post("/:id",UpdateStatus);
router.get("/soldproductview/get",fetchSoldProducts)
router.get("/soldproductdetails/get/:id",fetchSingleSoldProduct)

export default router;