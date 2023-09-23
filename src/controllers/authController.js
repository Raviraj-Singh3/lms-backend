import { userModel } from "../model/useSchema.js";
import emailValidator from 'email-validator'
import AppError from "../utils/error.util.js";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs/promises';

    const cookieOptions = {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        httpOnly: true,
        secure: true
    }

export const signup = async(req, res, next) => {

        const {name, email, password} = req.body;
        console.log(req.body);
        console.log(req.file);

        if(!name || !email || !password){
            return next( new AppError('All fields are required', 400));
            }

        const userExits = await userModel.findOne({email});
        if(userExits){
            return next( new AppError('Email already exists', 400));
        }

        const validEmail = emailValidator.validate(email);
        if(!validEmail){
            return res.status(400).json({
                success: false,
                message: 'email id is not valid'
                })
        }

        const user = await userModel.create({
            name,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: 'https://res.cloudinary.com/dlswiosde/image/upload/v1695328737/dp_kn22gm.webp'
            }
        });

        if(!user) {
            return next(new AppError('User registration failed, please try again', 400))
        }

        //TODO: file upload
        if(req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                });
                console.log(result);

                if(result){
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    //remove file from server
                    fs.rm(`uploads/${req.file.filename}`)

                    
                }

            } catch (error) {
                return next(new AppError(error || 'File not uploaded, please try again', 500))
            }
            
        }

        await user.save();

        user.password = undefined;


        const token = await user.jwToken();

        res.cookie('token', token, cookieOptions)

        return res.status(201).json({
            success: true,
            message: 'User registerd successfully',
            user
        });
};

export const signin = async(req, res, next) =>{

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new AppError('All fields are required', 400))
        }

        const user = await userModel.findOne({
            email
        }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Email or Password does not match', 400))
        }

        const token = user.jwToken();
        user.password = undefined;

        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        })
    } 
    catch (error) {
        return next(new AppError(error.message, 500));
    }

}

export const signout = (req, res, next) =>{

    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
};

export const getProfile = async(req, res, next) => {

    try {

        const userId = req.user.id;

        const user = await userModel.findById(userId);

        res.status(200).json({
            success: true,
            message: 'User details',
            user
        });
    } 
    catch (error) {
        return next(new AppError('Failed to fetch profile details', 500))
    }
    

}
