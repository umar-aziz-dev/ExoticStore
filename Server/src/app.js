import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./Routes/Auth.Routes/User.Route.js";
import superRouter from "./Routes/SuperAdmin.Routes/SuperAdmin.Routes.js";
import productRouter from "./Routes/Seller.Routes/Product.Routes.js";
import uploadRouter from "./Routes/Seller.Routes/Upload.Routes.js"
import soldRouter from "./Routes/Seller.Routes/Sold.Routes.js";
import userproductRouter from "./Routes/User.Routes/UserProduct.Routes.js"
import socialRouter from "./Routes/SuperAdmin.Routes/SocialLinks.Routes.js"
import contactRouter from "./Routes/SuperAdmin.Routes/Contact.Routes.js"
import policyRouter from "./Routes/SuperAdmin.Routes/Policy.Routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from frontend dist folder
app.use(express.static(path.resolve(__dirname, "../../frontend/dist")));

// your routes
app.use("/api/auth", userRouter);
app.use("/api/superadmin/admincreate", superRouter);
app.use("/api/seller/product", productRouter);
app.use("/api/seller/soldproducts", soldRouter);
app.use("/api/seller/api", uploadRouter);
app.use("/api/user/listing", userproductRouter);
app.use("/api/superadmin/sociallinks", socialRouter);
app.use("/api/superadmin/contactus", contactRouter);
app.use("/api/superadmin/policycreation", policyRouter);

// SPA fallback route - must come last
app.get(/.+/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/dist", "index.html"));
});


export default app;