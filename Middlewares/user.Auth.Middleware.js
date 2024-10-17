import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../Models/user.Schema.js";

const userAuthCheckMiddleware = async (req, res, next)=>{
  const { auth_token } = req.cookies;

    if(!auth_token) {
      return res.status(401).json({message:"Token Not Found"})
    }
    console.log("This is auth token received from front end ", auth_token);
    try {
      const decoded_token = await jwt.verify(auth_token, process.env.SECERET_JWT_KEY); 
      console.log("This is decoded toke details ", decoded_token);
      const userDetails = await UserModel.findById(decoded_token.userID);
      if(!userDetails) {
        console.log("User details not found in jwt verification");
        return res.status(401).json({message:"User details not found in jwt verification"});
      }
      req.user = userDetails;
      next();
    } catch (error) {
        console.log("There is some issus in user auth middleware plz fix the bug first ", error);
    }
}
export default userAuthCheckMiddleware;
