import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.Routes.js";
import userPosts from "./Routes/post.Routes.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DB_ID)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Your DB has been successfully connected and hosted on this port ", process.env.PORT)})
})
.catch((err)=>{
    console.log("Due to some errors we could't connect you DB and hosted your port plz fix the bug first ", err);
})

app.use("/api/profile", userRoutes);
app.use("/api/post", userPosts);