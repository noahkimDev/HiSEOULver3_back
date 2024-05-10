"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Index_1 = __importDefault(require("../Index"));
//! 모델 생성
const User = Index_1.default.define("user", {
    name: sequelize_1.DataTypes.TEXT,
    email: sequelize_1.DataTypes.TEXT,
    password: sequelize_1.DataTypes.TEXT,
});
//! define association(필요없음)
//? 모델간의 관계를 설정할 때,
//? 외래 키를 사용하거나, belongsTo 및 hasMany와 같은 메소드를 사용하여 관계를 설정할 수 있습니다
// User.hasMany(Comment);
exports.default = User;
