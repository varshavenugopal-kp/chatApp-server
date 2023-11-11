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
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken = require('../services/generateToken');
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, "hey");
    const { name, email, password } = req.body;
    const userData = {
        _id: email,
        name: name,
        email: email,
        password: password,
    };
    try {
        const user = yield userModel_1.default.findOne({ _id: email });
        console.log("my user is ", user);
        if (!user) {
            const createdUser = yield userModel_1.default.create(userData);
            // const createdUser = await userModel.create({ email, name, password });
            if (createdUser) {
                res.status(201).json({ message: "successful", data: createdUser });
            }
            else {
                res.status(403).json({ message: "unauthorized request" });
            }
        }
        else {
            res.status(201).json({ message: "successful", data: user });
        }
    }
    catch (error) {
        console.log("this is my errorr .................", error);
        res.status(503).json({ message: "internal server error" });
    }
});
// const check =
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user) {
        if (password === user.password) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    }
    else {
        res.json({ err: "Invalid Username or Password" });
    }
});
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const exist = await chatModel.find()
        // const list = exist
        const users = yield userModel_1.default.find();
        console.log(users, "kkkkkkkkkkkkkkkkk");
        if (users) {
            res.json({ data: users });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = {
    signup,
    loginUser,
    allUsers
};
