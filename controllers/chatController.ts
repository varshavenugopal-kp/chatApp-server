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
       const {senderId,receiverId} = req.body
       console.log("sender receiver",senderId,receiverId);
       
       const senders=new mongoose.Types.ObjectId(senderId)
       const receiver=new mongoose.Types.ObjectId(receiverId)
       if(!senderId || !receiverId){
        res.json({error:"Something went wrong"})
       }else{
        console.log("llllll");
        
            const isChat = await chatModel.findOne({
                $and:[{users:{$elemMatch:{$eq:senders}}},{users:{$elemMatch:{$eq:receiver}}}]
            }).populate("users","-password")
            console.log(isChat);
            
            if(isChat){
                res.json({chat:isChat})
            }else{
                const chatData:Chat={
                    chatName:'sender',
                    users:[senders,receiver],
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
        const userId = req.params.userId    
        const fullChat = await chatModel.find({users:{$in:[userId]}}).populate("users","-password").populate("latestMessage").sort({updatedAt:-1})
        res.json({status:true,fullchat:fullChat})
    }catch(err){
        console.error('Error creating course:', err);  
    }
}


export default {
    createChat,
    getAllChat
};
