import { UserModel } from "../Models/user.Schema.js";
import cloudinaryPhotoLink from "../Utils/cloudinary.photo.js";
import passwordHashingController from "../Utils/password.hashing.js";
import bcrypt from "bcrypt"
import createTokenForUser from "../Utils/user.Token.js";

// If User Create a New Account so this Code will run ::
export const userRegistrationController = async (req, res)=>{
    let {name, username, email, phone, password} = req.body;
    try {
        const hashedPassword = await passwordHashingController(password);
        console.log("This is returned hashed password in user controller ", hashedPassword);
        password = hashedPassword;
        const user = await UserModel.create({name, username, email, phone, password});
        console.log("User has been successfully created their account ", user);
        return res.status(201).json({message:"Account Created Successfully"});
    } catch (error) {
        console.log("Sorry we can not create your account due to this error plz fix the bug first ", error);
        return res.status(500).json({message:"Sorry we can not create your account due to this error plz fix the bug first ", error});
    }
}

// If User will sign in there account so this code will run ::
export const userSignInController = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            console.log("Invalid Email");
            return res.status(401).json({message:"Invalid Email"});
        }
        const passwordAuthentication = await bcrypt.compare(password, user.password);
        if(!passwordAuthentication) {
            console.log("Invalid Password");
            return res.status(401).json({message:"Invalid Password"});
        }
        const userToken = await createTokenForUser(user);
        console.log("This is user token received from user ", userToken);
        return res.status(201).cookie("auth_token", userToken, {maxAge:3600000}).json({message:"SignUp Successfully", user});
    } catch (error) {
        console.log("Sorry we can not signIn your account due to this error plz fix the bug first ", error);
        return res.status(500).json({message:"Sorry we can not signIn your account due to this error plz fix the bug first ", error});
    }
}

// When user open the site and if he has already logged in and he has token so this code will run ::
export const userAuthenticationController = async (req, res)=>{
    try {
       return res.status(201).json({user:req.user}); 
    } catch (error) {
        console.log("There is some issus in user controller line number 54-55 plz fix the bug first ", error);
        return res.status(501).json({message:"There is some issus in user controller line number 54-55 plz fix the bug first ", error});
    }
}
export const userDetailsController = async (req, res)=>{
    const {id} = req.params;
    try {
        const user = await UserModel.findById(id)
        return res.status(201).json({user}); 
     } catch (error) {
         console.log("There is some issus in user controller line number 54-55 plz fix the bug first ", error);
         return res.status(501).json({message:"There is some issus in user controller line number 54-55 plz fix the bug first ", error});
     }
}

// When user logged  out there account so this code will run ::
export const userLoggedOutController = async (req, res)=>{
    try {
        return res.status(201).clearCookie("auth_token").json({message:"User has been successfully logged out"});
    } catch (error) {
        console.log("Due to some errors we cant logged out you plz fix the bug first ", error);
        return res.status(500).json({message:"Due to some errors we cant logged out you plz fix the bug first ", error})
    }
}

// When user wants to delete there account so this code will run ::
export const userDeleteAccountController = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            console.log("Invalid Email");
            return res.status(401).json({message:"Invalid Email"});
        }
        const passwordAuthentication = await bcrypt.compare(password, user.password);
        if(!passwordAuthentication) {
            console.log("Invalid Password");
            return res.status(401).json({message:"Invalid Password"});
        }
        const deletedUser = await UserModel.findByIdAndDelete(user._id);
        return res.status(201).clearCookie("auth_token").json({message:"User account has successfully deleted"});
    } catch (error) {
        console.log("Sorry we can not delete your account due to this error plz fix the bug first ", error);
        return res.status(500).json({message:"Sorry we can not delete your account due to this error plz fix the bug first ", error});
    }
}

//If user wants to edit there information so this code will run ::
export const userProfileUpdateController  = async (req, res)=>{
    let {name, username, email, phone} = req.body;
    const photoLink = req.file ? req.file.path : null;
   try {
    const photo = photoLink ? await cloudinaryPhotoLink(photoLink) : null;
    const user = await UserModel.findOneAndDelete(
        {email},
        {name, username, photo : photo?.url, phone, email},
        {new: true, upsert: true}
    );
    return res.status(201).json({message: "User profile updated successfully", user});
   } catch (error) {
    console.log("Due to some errors we cant update your profile plz fix the bug first ", error);
    return res.status(500).json({message:"Due to some errors we cant update your profile plz fix the bug first"});
   }
}