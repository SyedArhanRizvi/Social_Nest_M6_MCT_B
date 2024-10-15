import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createTokenForUser = async (user) => {
  try {
    const userToken = await jwt.sign(
      {
        userID: user._id,
        userMail: user.email,
      },
      process.env.SECERET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    return userToken;
  } catch (error) {
    console.log("Due to some errors we cant create token for user plz fix the bug first ", error);
  }
};
export default createTokenForUser;
