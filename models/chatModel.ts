import mongoose, { Document, Model, Schema } from "mongoose";
import { Chat } from "../interfaces/chat";

export interface chat extends Document {
    chatName:string,
    users:String[],
    latestMessage?:mongoose.Types.ObjectId,
}

const chatSchema: Schema<chat> = new Schema<chat>({
    chatName:{
        type:String,
        required:true
    },
    users:[{
        type:String,
        ref:'users'
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'messages'
    }
},
{
    timestamps:true
})


const chatModel: Model<chat> = mongoose.model<chat>('chats', chatSchema);

export default chatModel;