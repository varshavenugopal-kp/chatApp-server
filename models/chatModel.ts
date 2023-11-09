import mongoose, { Document, Model, Schema } from "mongoose";
import { Chat } from "../interfaces/chat";

export interface chat extends Document {
    chatName:string,
    users:mongoose.Types.ObjectId[],
    latestMessage?:mongoose.Types.ObjectId,
}

const chatSchema: Schema<chat> = new Schema<chat>({
    chatName:{
        type:'string',
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'message'
    }
},
{
    timestamps:true
})


const chatModel: Model<chat> = mongoose.model<chat>('chats', chatSchema);

export default chatModel;