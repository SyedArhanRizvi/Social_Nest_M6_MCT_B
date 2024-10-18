import express from "express";
import { userAuthenticationController, userDeleteAccountController, userDetailsController, userLoggedOutController, userProfileUpdateController, userRegistrationController, userSignInController } from "../Controllers/user.Controller.js";
import { upload } from "../Middlewares/multer.upload.js";
import userAuthCheckMiddleware from "../Middlewares/user.Auth.Middleware.js";

const userRoutes = express.Router();

userRoutes.post("/createNewAccount", userRegistrationController);
userRoutes.post("/signIn", userSignInController);
userRoutes.post("/userAuthentication", userAuthCheckMiddleware, userAuthenticationController);
userRoutes.delete("/userDeleteAccount", userDeleteAccountController);
userRoutes.post("/userLoggedOut", userLoggedOutController);
userRoutes.put("/userUpdateProfile", upload.single("userPhoto"), userProfileUpdateController);
userRoutes.get("/getUserDetails:id", userDetailsController);


export default userRoutes;