import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},
{
    timestamps: true
}
);

export const userModel = mongoose.model('user', userSchema);