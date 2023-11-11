"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatModel_1 = __importDefault(require("../models/chatModel"));
//  interface chats{
//     status:boolean,
//     chat:any
//  }
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid, receiverid } = req.body;
        console.log("sender receiver", userid, receiverid);
        console.log("ioioio");
        //    const senders=new mongoose.Types.ObjectId(userid)
        //    const receiver=new mongoose.Types.ObjectId(receiverId)
        if (!userid || !receiverid) {
            res.json({ error: "Something went wrong" });
        }
        else {
            console.log("llllll");
            const isChat = yield chatModel_1.default.findOne({
                $and: [{ users: { $elemMatch: { $eq: userid } } }, { users: { $elemMatch: { $eq: receiverid } } }]
            }).populate("users", "-password");
            console.log(isChat);
            if (isChat) {
                res.json({ chat: isChat });
            }
            else {
                const chatData = {
                    chatName: 'sender',
                    users: [userid, receiverid],
                };
                console.log(chatData);
                const createdChat = yield chatModel_1.default.create(chatData);
                const fullChat = yield chatModel_1.default.findOne({ _id: createdChat._id }).populate('users', '-password');
                console.log(fullChat);
                res.json({ chat: fullChat });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
});
const getAllChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userid;
        console.log(userId);
        console.log(yield chatModel_1.default.find());
        const fullChat = yield chatModel_1.default.find({ users: { $in: [userId] } }).populate("users", "-password").populate("latestMessage").sort({ updatedAt: -1 });
        console.log(fullChat, "kloooiijkjjhj");
        res.json({ status: true, fullchat: fullChat });
    }
    catch (err) {
        console.error('Error:', err);
    }
});
exports.default = {
    createChat,
    getAllChat
};
