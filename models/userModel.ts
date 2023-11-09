import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    status: boolean;
}

const userSchema: Schema<User> = new Schema<User>({
    _id:{
       type:String,
       unique:true,
       required:true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
});

const userModel: Model<User> = mongoose.model<User>('users', userSchema);

export default userModel;
