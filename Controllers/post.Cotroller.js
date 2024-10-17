import { FileModel } from "../Models/DemoFile.Schema.js";
import { PostModel } from "../Models/post.Schema.js";
import cloudinaryPhotoLink from "../Utils/cloudinary.photo.js";

// When user will upload a new post so this code will run ::
export const addNewPostController = async (req, res)=>{
    const {description, gif, emoji} = req.body;
    const photoLink = req.file ? req.file.path : null;
    if(!photoLink) {
        console.log("File Does't exist", photoLink);
    }
    try {
        const file = await cloudinaryPhotoLink(photoLink);
        const uploadedPost = await PostModel.create({description, gif, emoji, file: file?.url});
        console.log(description, file);
        
        return res.status(201).json({message: "User Post has successfully uploaded ", uploadedPost});
    } catch (error) {
        console.log("Due to errors we cant upload your post plz fix the bug first ", error);
        return res.status(500).json({message:"Due to errors we cant upload your post plz fix the bug first ", error});
    }
}

// When user will update his/her post so this code will run ::
export const updateExistingPostController = async (req, res)=>{
    const  {description, } = req.body;
    const {id} = req.params;
    console.log("This is updated post id ", id);
    try {
        const updatedPost = await PostModel.findOneAndUpdate(
            {_id:id},
            {description, edited:true},
            {new: true, upsert: true}
        );
        return res.status(201).json({message:"User post has successfully updated ", updatedPost});
    } catch (error) {
        console.log("Due to errors we cant update your post plz fix the bug first ", error);
        return res.status(500).json({message:"Due to errors we cant update your post plz fix the bug first ", error});
    }
}

// When user will delete his/her post so this code will run ::
export const deletePostController = async (req, res)=>{
    const {id} = req.params;
    console.log("This is deleted post id ", id);
    try {
        const deletedPost = await PostModel.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json({message:"User post has successfully deleted ", deletedPost});
    } catch (error) {
        console.log("Due to errors we cant delete your post plz fix the bug first ", error);
        return res.status(500).json({message:"Due to errors we cant delete your post plz fix the bug first ", error});
    }
}

// Get All User Post Controller ::
export const getAllPosts = async (req, res)=>{
    try {
        const allPosts = await PostModel.find();
        if(!allPosts) {
            console.log("Sorry there is no post", allPosts);
            return res.status(404).json({message:"Sorry there is such posts available plz add some posts first"});
        }
        return res.status(200).json({allPosts});
    } catch (error) {
        console.log("Due to errors we cant show you all posts plz fix the bug first ", error);
        return res.status(500).json({message:"Due to errors we cant show you all posts plz fix the bug first ", error});
    }
}

export const userFileHandlerController = async (req, res)=>{
    const filePath = req.file ? req.file.path : null;
    if(!filePath) {
        console.log("File Does't exist", filePath);
        return res.status(401).json({message:"File Does't exist"})
    }
    try {
        const file = await cloudinaryPhotoLink(filePath);
        const uploadedFile = await FileModel.create({file:file.url});
        console.log("This is demo file link ", uploadedFile);
        return res.status(201).json({message:"Demo File Has Successfully Uploaded", uploadedFile});
    } catch (error) {
        console.log("There is some issus so we can't handler your file ", error);
        return res.status(500).json({message:"There is some issus so we can't handler your file ", error});
    }
}