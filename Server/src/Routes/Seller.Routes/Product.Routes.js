import express from "express"
import { AddProduct, deleteProduct, editProduct, fetchProduct, fetchSingleProduct } from "../../Controllers/Seller.Controller/Product.Controller.js";



const router = express.Router();

router.post("/add",AddProduct);
router.put("/edit/:id",editProduct);
router.get("/get",fetchProduct);
router.delete("/delete/:id",deleteProduct);
router.get("/fetch/:id",fetchSingleProduct)


export default router;