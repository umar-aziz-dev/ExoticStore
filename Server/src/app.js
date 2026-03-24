import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/Auth.Routes/User.Route.js";
import superRouter from "./Routes/SuperAdmin.Routes/SuperAdmin.Routes.js";
import productRouter from "./Routes/Seller.Routes/Product.Routes.js";
import uploadRouter from "./Routes/Seller.Routes/Upload.Routes.js"
import soldRouter from "./Routes/Seller.Routes/Sold.Routes.js";
import userproductRouter from "./Routes/User.Routes/UserProduct.Routes.js"
import socialRouter from "./Routes/SuperAdmin.Routes/SocialLinks.Routes.js"
import contactRouter from "./Routes/SuperAdmin.Routes/Contact.Routes.js"
import policyRouter from "./Routes/SuperAdmin.Routes/Policy.Routes.js"

const app = express();

app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// your routes
app.use("/auth", userRouter);
app.use("/superadmin/admincreate", superRouter);
app.use("/seller/product", productRouter);
app.use("/seller/soldproducts", soldRouter)
app.use("/seller/api", uploadRouter);
app.use("/user/listing", userproductRouter);
app.use("/superadmin/sociallinks", socialRouter);
app.use("/superadmin/contactus", contactRouter);
app.use("/superadmin/policycreation",policyRouter);

export default app;