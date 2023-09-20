import { userModel } from "../model/useSchema.js";

export const signup = async(req, res, next) => {
    try {
        const {name, email, password} = req.body;
        console.log(name, email, password);
        
        const user = userModel(req.body);
        const result = await user.save();
        return res.status(200).json({
            success: true,
            data: result
    })
    } catch (error) {
        return res.status(501).json({
            success: false,
            error: error
        })
    }
    
}