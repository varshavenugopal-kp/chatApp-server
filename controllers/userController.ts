import { Request, Response } from "express";
import userModel from "../models/userModel";
import chatModel from "../models/chatModel";
const generateToken = require('../services/generateToken')
const signup = async (req: Request, res: Response) => {
    console.log(req.body, "hey");
    const { name, email, password } = req.body
    const userData = {
        _id: email,
        name: name,
        email: email,
        password: password,
    }
    try {
        const user = await userModel.findOne({ _id: email })
        console.log("my user is ", user);

        if (!user) {
            const createdUser = await userModel.create(userData);
            // const createdUser = await userModel.create({ email, name, password });

            if (createdUser) {
                res.status(201).json({ message: "successful", data: createdUser });
            } else {
                res.status(403).json({ message: "unauthorized request" })
            }
        } else {
            res.status(201).json({ message: "successful", data: user });

        }
    }
    catch (error) {

        console.log("this is my errorr .................", error);


        res.status(503).json({ message: "internal server error" })



    }


};

// const check =

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
        if (password === user.password) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,

                token: generateToken(user._id)
            })
        }
    } else {
        res.json({ err: "Invalid Username or Password" })
    }
}

const allUsers = async (req: Request, res: Response) => {
    try {
        // const exist = await chatModel.find()
        // const list = exist
        const users =await userModel.find()
        console.log(users,"kkkkkkkkkkkkkkkkk");
        
        if (users) {
            res.json({ data: users })
            
            
        }
    } catch (err) {
        console.log(err);

    }

}


export default {
    signup,
    loginUser,
    allUsers
};

