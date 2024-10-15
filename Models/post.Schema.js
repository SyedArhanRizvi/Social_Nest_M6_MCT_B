import mongoose from "mongoose";

const UserPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, subject: {
        type: String,
        required: true
    }, file: {
        type: String
    },
    edited: {
        type: Boolean,
        default : false
    }
}, {timestamps: true});

export const PostModel = mongoose.model("PostModel", UserPostSchema);