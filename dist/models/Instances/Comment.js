"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Index_1 = __importDefault(require("../Index"));
//! 모델 생성
const Comment = Index_1.default.define("comment", {
    userName: {
        type: sequelize_1.DataTypes.TEXT,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    exhibitionNum: sequelize_1.DataTypes.TEXT,
    comment: sequelize_1.DataTypes.TEXT,
});
//! define association => Assosiation.ts
exports.default = Comment;
