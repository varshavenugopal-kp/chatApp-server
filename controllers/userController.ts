import { Request, Response } from "express";
import userModel from "../models/userModel";
const generateToken=require('../services/generateToken')
const signup = async (req: Request, res: Response) => {
    console.log(req.body,"hey");
    const {name,email,password}=req.body
    const userData={
        _id:email,
        name:name,
        email:email,
        password:password,
    }
    try{
        const createdUser = await userModel.insertMany(userData);
        // const createdUser = await userModel.create({ email, name, password });

        if(createdUser){
             res.status(201).json({ message: "successful" ,data:createdUser});
        }else{
            res.status(403).json({message:"unauthorized request"})
        }
    }
    catch(error){
        res.status(503).json({message:"internal server error"})
        
    }
   
   
};

const loginUser=async(req:Request , res:Response)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(user ){
        if(password===user.password){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                
                token:generateToken(user._id)
            })
        }
    }else{
        res.json({err:"Invalid Username or Password"})
    }
}

const allUsers=async(req:Request , res:Response)=>{
    try{
        const users=userModel.find()
   if(users){
    res.json({userData:users})
   }
    }catch(err){
        console.log(err);
        
    }
   
}


export default {
    signup,
    loginUser,
    allUsers
};

