import mongoose, { Document, Model, Schema } from "mongoose";

export interface Message extends Document {
    sender:mongoose.Types.ObjectId
    content:string
    chatId:mongoose.Types.ObjectId,
}

const messageSchema: Schema<Message> = new Schema<Message>({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    content:{
        type:'String',
        trim:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chats'
    },
   
},
{
    timestamps:true
})


const messageModel: Model<Message> = mongoose.model<Message>('messages', messageSchema);

export default messageModel;