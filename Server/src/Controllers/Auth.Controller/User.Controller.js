import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../../Models/User.Model.js";
import ApiError from "../../Utils/ApiError.js";
import ApiResponse from "../../Utils/ApiResponse.js";
import AsyncHandler from "../../Utils/AsyncHandler.js";


export const SignupUser = AsyncHandler(async (req, res) => {
    const { username, phone,email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(401).json(
            new ApiResponse(400, null,"All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(401).json(
            new ApiResponse(400,null,"Email Already Exists")
        )
    }


    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        email,
        phone,
        password: hashPassword,
    })
    await user.save();

    res.status(201)
        .json(new ApiResponse(201, user, "Account created successfully"));
});
export const SigninUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("All field reqired to signin")
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json(
                new ApiResponse(401, "User not Exists")
            )
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
           return  res.status(400).json(
                new ApiResponse(401,null ,"Incorrect Password")
            )
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
        }, process.env.CLIENT_SECRET_KEY, {
            expiresIn: process.env.CLIENT_SECRECT_EXPIRY
        })
        const options = {
            httpsOnly: true,
            secure: true,
        }
        const finaluser = await User.findById(user._id).select("-password");
        res.status(200)
            .cookie("token", token, options)
            .json(new ApiResponse(201, finaluser, "User signed in successfully"))

    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Error in signingin the user")
        )
    }
}
export const SignoutUser = async (req, res) => {
    try {
        const options = {
            httpsOnly: true,
            secure: true,
        }
        res.status(200)
            .clearCookie("token", options)
            .json(
                new ApiResponse(201, "User loged Out Successfully")
            )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Error in signing out the user")
        )
    }
}
export const CheckAuth = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(
            new ApiResponse(201, user, "Authorized user")
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Error in user authentication")
        )
    }
}
export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new ApiError(404, "Email is required")
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User doesnt Exists");
        }
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.userresetpassToken = resetToken;
        user.userresetpassExpiry = Date.now() + 10 * 60 * 1000;

        const resetUrl = `http://localhost:5173/auth/resetpassword/${resetToken}`;

        const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS,
            },
        });

        const mailoption = {
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: "Password Reset Email",
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">Reset Password</a>
             <p>Link expires in 10 minutes</p>`,
        };

        await transpoter.sendMail(mailoption)

        res.status(200).json(
            new ApiResponse(201, "Reset Password Email Send to Your Email")
        )

    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Failed to send email")
        )
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { passsword } = req.body;

        const user = await User.findOne({
            userresetpassToken: token,
            userresetpassExpiry: { $gt: Date.now() },
        })
        if (!user) {
            res.status(400).json(
                new ApiResponse(401, "invalid Token or Token Expired")
            )
        }

        const hashPassword = await bcrypt.hash(passsword, 10);
        user.passsword = hashPassword;

        userresetpassToken = undefined;
        userresetpassExpiry = undefined;

        user.save();

        res.status(200).json(
            new ApiResponse(
                201, "Password has been Reset Sucessfully"
            )
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Failed to reset password")
        )
    }
}
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googlelogin = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload();
        const { email, name, sub } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            user = User.create({
                username: name,
                email: email,
                googleid: sub,
            })
        }
        res.status(200).json(
            new ApiResponse(201, user, "Login with Google Successfull")
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Failed to Login with Google")
        )
    }
}