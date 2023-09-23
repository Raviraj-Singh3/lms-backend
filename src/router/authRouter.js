import express from "express";
import { signup, signin, signout, getProfile, forgotPassword, resetPassword } from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const authRouter = express.Router();

authRouter.post('/signup', upload.single("avatar"), signup);
authRouter.post('/signin', signin);
authRouter.get('/signout', signout);
authRouter.get('/me', isLoggedIn, getProfile);
authRouter.post('/forgot/password', forgotPassword),
authRouter.post('/reset-password', resetPassword)


export {
    authRouter
}