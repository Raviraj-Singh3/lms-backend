import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';


export const isLoggedIn = async(req, res , next) =>{

    const { token } = req.cookies;

    if(!token) {
        return next(new AppError('Unauthenticated, please login again', 401))
    }

    const userDetails = await jwt.verify(token, process.env.SECRET);

    req.user = userDetails;

    next();
}

