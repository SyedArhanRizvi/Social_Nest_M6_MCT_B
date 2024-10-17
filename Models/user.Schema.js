import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, username:{
        type:String,
        required:true,
        unique:true
    }, email:{
        type:String,
        required:true,
        unique:true
    }, phone:{
        type:Number,
        required:true
    }, password:{
        type:String,
        required:true
    }, photo: {
        type: String
    }
}, {timestamps:true});

export const UserModel = mongoose.model("User", userSchema);