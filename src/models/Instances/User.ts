import { DataTypes } from "sequelize";
import sequelize from "../Index";

//! 모델 생성
const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
});

//! define association(필요없음)
//? 모델간의 관계를 설정할 때,
//? 외래 키를 사용하거나, belongsTo 및 hasMany와 같은 메소드를 사용하여 관계를 설정할 수 있습니다
// User.hasMany(Comment);

export default User;
