import express from "express"
import { CheckAuth, ForgotPassword, googlelogin, ResetPassword, SigninUser, SignoutUser, SignupUser } from "../../Controllers/Auth.Controller/User.Controller.js"


const router = express.Router();



router.post("/signup", SignupUser);
router.post("/signin", SigninUser);
router.delete("/signout", SignoutUser);
router.get("/checkauth", CheckAuth);
router.post("/forgotpassword", ForgotPassword);
router.post("/resetpassword/:token", ResetPassword);
router.post("/google-login",googlelogin)


export default router;