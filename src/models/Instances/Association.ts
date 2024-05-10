import Comment from "./Comment";
import User from "./User";

User.hasMany(Comment);

//! foreignKey 역할을 하게 될 userId 컬럼이 생성됨

Comment.belongsTo(User, {
  foreignKey: "userId",
});

export { User, Comment };
