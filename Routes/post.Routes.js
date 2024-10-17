import express from "express";
import { upload } from "../Middlewares/multer.upload.js";
import { addNewPostController, deletePostController, getAllPosts, updateExistingPostController, userFileHandlerController } from "../Controllers/post.Cotroller.js";

const userPosts = express.Router();

userPosts.post("/addNewPost", upload.single("file"), addNewPostController);
userPosts.put("/updateExistingPost:id", updateExistingPostController);
userPosts.delete("/deletePost:id", deletePostController);
userPosts.get("/getAllPosts", getAllPosts);
userPosts.post("/fileHandler", upload.single("file"), userFileHandlerController)

export default userPosts;