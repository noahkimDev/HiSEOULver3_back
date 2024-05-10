import bcrypt from "bcrypt";
import { User } from "../models/Instances/Association";

// 회원가입 입력한 회원정보와 일치하는 회원이 있는지
// 비밀번호까지 bcrypt compare를 사용하여 비교
export async function signup(email: string, name: string, password: string) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hashSync(password, saltRounds);

    const checkUser = await User.findOne({
      where: {
        email: email,
        name: name,
      },
    });

    if (checkUser) {
      const comparePwd = await bcrypt.compareSync(
        password,
        checkUser.dataValues.password
      );
      if (comparePwd) {
        // console.log("1");
        return false;
      } else {
        // console.log("2");
        await User.create({ name: name, email: email, password: hash });
        return true;
        //   return res.status(200).json({ success: true });
      }
    } else {
      await User.create({ name: name, email: email, password: hash });
      return true;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error happened");
  }
}

export async function signin(userInfo: { email: string; password: string }) {
  // console.log(userInfo, "here");
  const { email, password } = userInfo;
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (findUser) {
    const comparePwd = await bcrypt.compareSync(
      password,
      findUser.dataValues.password
    );

    if (comparePwd) {
      // 로그인 성공!
      return findUser;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
