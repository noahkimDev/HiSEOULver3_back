"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const Index_1 = __importDefault(require("./Index"));
const User = Index_1.default.define("user", {
    name: sequelize_1.DataTypes.TEXT,
    email: sequelize_1.DataTypes.TEXT,
    password: sequelize_1.DataTypes.TEXT,
});
exports.User = User;
