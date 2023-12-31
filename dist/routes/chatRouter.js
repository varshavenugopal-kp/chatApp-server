"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = __importDefault(require("../controllers/chatController"));
const router = (0, express_1.Router)();
router.post('/', chatController_1.default.createChat);
router.get('/userChat/:userid', chatController_1.default.getAllChat);
exports.default = router;
