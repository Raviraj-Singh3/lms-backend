import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

export const userModel = mongoose.model('user', userSchema);