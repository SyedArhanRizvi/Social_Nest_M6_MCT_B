import { PostModel } from "../Models/post.Schema.js";
import cloudinaryPhotoLink from "../Utils/cloudinary.photo.js";

// When user will upload a new post so this code will run ::
export const addNewPostController = async (req, res)=>{
    const {title, description, subject} = req.body;
    const photoLink = req.file ? req.file.path : null;
    try {
        const file = photoLink? await cloudinaryPhotoLink(photoLink) : null;
        const uploadedPost = await PostModel.create({title, description, subject, file : file?.url});
        return res.status(201).json({message: "User Post has successfully uploaded ", uploadedPost});
    } catch (error) {
        console.log("Due to errors we cant upload your post plz fix the bug first ", error);
        return res.status(500).json({message:"Due to errors we cant upload your post plz fix the bug first ", error});
    }
}

// When user will update his/her post so this code will run ::
export const updateExistingPostController = async (req, res)=>{
    const  {title, description, subject} = req.body;
    const {id} = req.params;
    console.log("This is updated post id ", id);
    try {
        const updatedPost = await PostModel.findOneAndUpdate(
            {_id:id},
            {title, subject, description, edited:true},
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