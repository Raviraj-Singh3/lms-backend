import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, "name must be atleast 5 character"],
        maxLength: [50, 'Name should be less than 50 character'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        unique: [true, "email already exists"],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be atleast 8 character'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

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
});

userSchema.methods = {
    jwToken: async function() {
        return await Jwt.sign({
            id: this._id,
            email: this.email,
            subscription: this.subscription,
            role: this.role
        }, 
            process.env.SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
        )
    },
    comparePassword: async function(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password)
    }
}

export const userModel = mongoose.model('user', userSchema);