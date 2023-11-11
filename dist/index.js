"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
const db = __importStar(require("./config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
db.connectToDatabase();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use("/", userRouter_1.default);
const server = app.listen(8000, () => {
    console.log("connected");
});
app.use('/', userRouter_1.default);
app.use('/chat', chatRouter_1.default);
app.use('/send', messageRouter_1.default);
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: [process.env.CLIENT],
        methods: ["GET", "POST", "PUT"]
    },
});
console.log(io, "lllllll");
io.on("connection", (socket) => {
    console.log("connected to socket.io");
    socket.on("setup", (userId) => {
        socket.join(userId);
        //  console.log("usr joined room",userId);
        socket.emit("connected");
    });
    //    socket.on("disconnect", ()=> {
    //     console.log('user disconnected room');
    // })
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined room : " + room);
    });
    socket.on("stoptyping", (id) => {
        console.log(id);
    });
    socket.on('new message', (newMessageRecieved) => {
        console.log(newMessageRecieved);
        var chat = newMessageRecieved.chatId;
        if (!chat.users)
            return console.log("chat not found");
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
});
