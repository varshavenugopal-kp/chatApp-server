import { Request, Response } from "express";
import chatModel, { chat } from "../models/chatModel";
import { Chat } from "../interfaces/chat";
import userModel from "../models/userModel";
import mongoose from "mongoose";
//  interface chats{
//     status:boolean,
//     chat:any
//  }
const createChat = async (req:Request , res:Response) => {
    try{
       const {userid,receiverid} = req.body
       console.log("sender receiver",userid,receiverid);
       console.log("ioioio");
       
    //    const senders=new mongoose.Types.ObjectId(userid)
    //    const receiver=new mongoose.Types.ObjectId(receiverId)
       if(!userid || !receiverid){
        res.json({error:"Something went wrong"})
       }else{
        console.log("llllll");
        
            const isChat = await chatModel.findOne({
                $and:[{users:{$elemMatch:{$eq:userid}}},{users:{$elemMatch:{$eq:receiverid}}}]
            }).populate("users","-password")
            console.log(isChat);
            
            if(isChat){
                res.json({chat:isChat})
            }else{
                const chatData:Chat={
                    chatName:'sender',
                    users:[userid,receiverid],
                }
                console.log(chatData);
                
                const createdChat=await chatModel.create(chatData)
                const fullChat=await chatModel.findOne({_id:createdChat._id}).populate('users','-password')
                console.log(fullChat);
                
                
               res.json({chat:fullChat})
            }
         
       }  
    }catch(err){    
       console.log(err);
       
    }
}

const getAllChat = async(req:Request,res:Response)=>{
    try{
        
        const userId = req.params.userid    
        console.log(userId);
        console.log(await chatModel.find());
        
        const fullChat = await chatModel.find({users:{$in:[userId]}}).populate("users","-password").populate("latestMessage").sort({updatedAt:-1})
        console.log(fullChat,"kloooiijkjjhj");
        
        res.json({status:true,fullchat:fullChat})
    }catch(err){
        console.error('Error:', err);  
    }
}


export default {
    createChat,
    getAllChat
};
