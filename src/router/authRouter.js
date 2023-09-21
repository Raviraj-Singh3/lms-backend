import express from "express";
import { signup, signin, signout, getProfile } from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/signout', signout);
authRouter.get('/me', isLoggedIn, getProfile);

export {
    authRouter
}