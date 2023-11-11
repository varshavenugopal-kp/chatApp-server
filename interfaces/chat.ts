import mongoose from "mongoose";
import { User } from "./user";


export interface Chat{
    chatName:string,
    users:String[],
    latestMessage?:mongoose.Types.ObjectId,
    
}

export interface Message{
    sender:String,
    content:String,
    chat:mongoose.Types.ObjectId,
}

export interface newMessageRecieved{
    _id:string,
    sender:Sender,
    content:string,
    chatId:ChatInMsg

}
interface Sender{
    _id:string,
    username: string,
    firstname: string,
    lastname: string,
    profileIm:string
}
interface ChatInMsg{
    _id:string,
    users:User[],
    
}