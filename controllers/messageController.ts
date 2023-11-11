import { Request, Response } from 'express';
import messageModel from '../models/messageModel';
import userModel from '../models/userModel';
import chatModel from '../models/chatModel';
import mongoose from 'mongoose';


const sendMessage = async (req: Request, res: Response) => {
    const { content, chatId, userid } = req.body;
    console.log(req.body);
    
    if (!content || !chatId) {
        return res.json({ error: 'Invalid data' });
    }

    try {
        var newMessage = {
            sender:userid,
            content:content,
            chatId:new mongoose.Types.ObjectId(chatId)
        };
    //    console.log(newMessage,"oooooooooooooooooooooooooooooooooooooooo");
       
        let message=await messageModel.create(newMessage)
        
        
        // message =await message.populate("sender",'_id name')   

        // message=await message.populate('chatId')
        // console.log(message,"lkkkllkklkklklklklklklklklklklklklk");
        // message=await message.populate('chatId.users')
       

        // await chatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:JSON.stringify(message)}})


        message =await message.populate("sender",'_id name')   
        message=await message.populate('chatId')
        message=await message.populate('chatId.users')
       console.log(message,"lkoiojhggffgghghgh");
       

        await chatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:message}})


        res.json({message:message})

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const AllMessages = async (req: Request, res: Response) => {
    try {
        const chatId=req.params.chatId
        console.log(chatId,"kkkkkkkkkkkkkkkkkkkkkkkkkk");
        
        const messages=await messageModel.find({chatId:new mongoose.Types.ObjectId(chatId)}).populate("sender",'name,profileImg').populate('chatId')
        console.log(messages);
        
        res.json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    sendMessage,
    AllMessages,
};
