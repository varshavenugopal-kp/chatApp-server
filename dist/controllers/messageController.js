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
const messageModel_1 = __importDefault(require("../models/messageModel"));
const chatModel_1 = __importDefault(require("../models/chatModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, chatId, userid } = req.body;
    console.log(req.body);
    if (!content || !chatId) {
        return res.json({ error: 'Invalid data' });
    }
    try {
        var newMessage = {
            sender: userid,
            content: content,
            chatId: new mongoose_1.default.Types.ObjectId(chatId)
        };
        //    console.log(newMessage,"oooooooooooooooooooooooooooooooooooooooo");
        let message = yield messageModel_1.default.create(newMessage);
        // message =await message.populate("sender",'_id name')   
        // message=await message.populate('chatId')
        // console.log(message,"lkkkllkklkklklklklklklklklklklklklk");
        // message=await message.populate('chatId.users')
        // await chatModel.updateOne({_id:new mongoose.Types.ObjectId(chatId)},{$set:{latestMessage:JSON.stringify(message)}})
        message = yield message.populate("sender", '_id name');
        message = yield message.populate('chatId');
        message = yield message.populate('chatId.users');
        console.log(message, "lkoiojhggffgghghgh");
        yield chatModel_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(chatId) }, { $set: { latestMessage: message } });
        res.json({ message: message });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const AllMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatId = req.params.chatId;
        console.log(chatId, "kkkkkkkkkkkkkkkkkkkkkkkkkk");
        const messages = yield messageModel_1.default.find({ chatId: new mongoose_1.default.Types.ObjectId(chatId) }).populate("sender", 'name,profileImg').populate('chatId');
        console.log(messages);
        res.json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = {
    sendMessage,
    AllMessages,
};
