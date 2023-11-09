import { Request, Response } from 'express';
import messageModel from '../models/messageModel';
import userModel from '../models/userModel';
import chatModel from '../models/chatModel';
import mongoose from 'mongoose';


const sendMessage = async (req: Request, res: Response) => {
    const { content, chatId, sender } = req.body;
    if (!content || !chatId) {
        return res.json({ error: 'Invalid data' });
    }

    try {
        var newMessage = {
            sender:new mongoose.Types.ObjectId(sender),
            content:content,
            chatId:new mongoose.Types.ObjectId(chatId)
        };

        let message=await messageModel.create(newMessage)
        message =await message.populate("sender",'_id name,profileImg')   
        message=await message.populate('chatId')
        message=await message.populate('chatId.users')
        

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
        console.log(chatId);
        
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
