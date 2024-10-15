import bcrypt from "bcrypt";
const passwordHashingController = async(password)=>{
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Your Password has been successfully hashed ", hashedPassword);
      return hashedPassword;  
    } catch (error) {
        console.log("Due to some errors we could't hashed you password");
    }
}
export default passwordHashingController;