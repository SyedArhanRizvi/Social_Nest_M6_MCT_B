import express from "express";
import { upload } from "../Middlewares/multer.upload.js";
import { addLikeOrCommentController, addNewPostController, deletePostController, getAllPosts, updateExistingPostController, userFileHandlerController } from "../Controllers/post.Cotroller.js";
import userAuthCheckMiddleware from "../Middlewares/user.Auth.Middleware.js";

const userPosts = express.Router();

userPosts.post("/addNewPost", upload.single("file"), userAuthCheckMiddleware, addNewPostController);
userPosts.put("/addLikeOrComment/:id", addLikeOrCommentController);
userPosts.put("/updateExistingPost:id", updateExistingPostController);
userPosts.delete("/deletePost:id", deletePostController);
userPosts.get("/getAllPosts", getAllPosts);
userPosts.post("/fileHandler", upload.single("file"), userFileHandlerController)

export default userPosts;