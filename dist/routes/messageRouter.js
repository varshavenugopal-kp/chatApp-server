"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = __importDefault(require("../controllers/messageController"));
const router = (0, express_1.Router)();
router.post('/', messageController_1.default.sendMessage);
router.get('/:chatId', messageController_1.default.AllMessages);
exports.default = router;
