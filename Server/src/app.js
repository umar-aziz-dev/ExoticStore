import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/Auth.Routes/User.Route.js";
import superRouter from "./Routes/SuperAdmin.Routes/SuperAdmin.Routes.js";
import productRouter from "./Routes/Seller.Routes/Product.Routes.js";
import uploadRouter from "./Routes/Seller.Routes/Upload.Routes.js"

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
app.use("/seller/api",uploadRouter)

export default app;