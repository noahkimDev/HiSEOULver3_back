"use strict";
//! connecting to Database
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
const { DATABASE_NAME, USERNAME_2, DATABASE_PASSWORD } = process.env;
//?  '!'연산자는 해당 변수가 절대 undefined가 아님을 보장합니다.
const sequelize = new sequelize_1.Sequelize(DATABASE_NAME, USERNAME_2, DATABASE_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    dialectModule: require("mysql2"),
});
exports.default = sequelize;
