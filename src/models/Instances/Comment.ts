import { DataTypes } from "sequelize";
import sequelize from "../Index";
import User from "./User";

//! 모델 생성
const Comment = sequelize.define("comment", {
  userName: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  exhibitionNum: DataTypes.TEXT,
  comment: DataTypes.TEXT,
});

//! define association => Assosiation.ts

export default Comment;
