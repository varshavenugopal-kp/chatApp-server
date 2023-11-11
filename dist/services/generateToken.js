"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: '3d'
    });
};
module.exports = generateToken;
