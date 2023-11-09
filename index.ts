import express from 'express'
import cors from 'cors'
import userRouter from "./routes/userRouter"
import chatRouter from './routes/chatRouter'
import messageRouter from './routes/messageRouter'
import * as db from './config'
import { Socket } from 'socket.io'
import { newMessageRecieved } from './interfaces/chat'

const app=express()
db.connectToDatabase()

app.use(express.json())

app.use(cors({
    origin:['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true
}))

 app.use("/", userRouter)
 const server = app.listen(8000,()=>{
    console.log("connected");   
})
app.use('/',userRouter)
app.use('/chat',chatRouter)
app.use('/send',messageRouter)

const io=require('socket.io')(server , {
    pingTimeout:60000,
    cors:{
        origin: ["https://localhoset:3000"],
        methods: ["GET", "POST", "PUT"]
    },
})

console.log(io,"lllllll");



io.on("connection",(socket:any)=>{
    console.log("connected to socket.io");
    socket.on("setup", (userId:string) => {
        socket.join(userId);``
       //  console.log("usr joined room",userId);
        socket.emit("connected");
       })
    //    socket.on("disconnect", ()=> {
    //     console.log('user disconnected room');
        
    // })
    socket.on('join chat',(room:string)=>{
        socket.join(room)
        console.log("User Joined room : " + room);  
    })

    socket.on('new message', (newMessageRecieved:newMessageRecieved)=>{
        var chat = newMessageRecieved.chat
        if(!chat.users) return console.log("chat not found");
        chat.users.forEach(user => {
          if(user._id == newMessageRecieved.sender._id) return
          socket.in(user._id).emit("message recieved",newMessageRecieved)
        });
      })
    })
    