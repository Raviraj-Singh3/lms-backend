import { userModel } from "../model/useSchema.js";
import emailValidator from 'email-validator'

export const signup = async(req, res, next) => {

        const {name, email, password} = req.body;
        console.log(name, email, password);
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: 'every fields is required'
                })
            }
        const userExits = await userModel.findOne({email});
        if(userExits){
            return res.status(400).json({
                success: false,
                message: 'A user already exists with this email'
                })
        }

        const validEmail = emailValidator.validate(email);
        if(!validEmail){
            return res.status(400).json({
                success: false,
                message: 'email id is not valid'
                })
        }

        try {
            const user = await userModel(req.body);
            const result = await user.save();
            return res.status(200).json({
                success: true,
                 data: result
            })
            } catch (error) {
                if(error.code === 11000){
                    return res.status(400).json({
                        success: false,
                        message: 'account already exists with email'
                    })
                }
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
    
}