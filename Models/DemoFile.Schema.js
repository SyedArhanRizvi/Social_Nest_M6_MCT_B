import mongoose from "mongoose";

const DemoFileSchema = new mongoose.Schema({
    file : {
        type: String
    }
});

export const FileModel = mongoose.model("FileModel", DemoFileSchema)