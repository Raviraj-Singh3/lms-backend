import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, "name should be minimun 5 character"],
        trim: true,
        
    },
    email: {
        type: String,
        required: true ,
        unique: true,
        lowercase: true,
        unique: [true, "email already exists"]
        
    },
    password: {
        type: String,
        select: false
    }
},
{
    timestamps: true
}
);

export const userModel = mongoose.model('user', userSchema);