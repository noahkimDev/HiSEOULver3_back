import express, { Request, Response, NextFunction } from "express";
import { signup, signin } from "./functions";
import { auth } from "../middleware/auth";

const jwt = require("jsonwebtoken");
const router = express.Router();
const saltRounds = 10;

require("dotenv").config();

router.post("/register", async (req: Request, res: Response) => {
  // console.log(req.body, "회원정보");
  const { email, name, password } = req.body;

  try {
    const result = await signup(email, name, password);
    // console.log("여기", result);
    if (result) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  const result = await signin(req.body);
  try {
    if (result) {
      //! 쿠키, jwt
      // console.log(result.dataValues.id, "Here we go!!!");
      const accessTime = 60 * 15;
      const refreshTime = 60 * 60 * 24;

      const accessToken = jwt.sign(
        { data: result.dataValues.id },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: accessTime }
      );

      const refreshToken = jwt.sign(
        { data: result.dataValues.id },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: refreshTime }
      );
      // console.log(token, "토큰");
      return res
        .cookie("access", accessToken)
        .cookie("refresh", refreshToken)
        .status(200)
        .json({
          success: true,
          name: result.dataValues.name,
          id: result.dataValues.id,
        });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
});

interface AuthenticatedRequest extends Request {
  newToken?: {
    accessToken?: boolean;
    refreshToken?: boolean;
    newAccessToken?: unknown;
    id?: number;
  };
}

router.get("/logout", async (req: Request, res: Response) => {
  res.clearCookie("access");
  res.clearCookie("refresh");
  res.status(200).json({ success: true });
});

//! navibar component와 연결
router.get("/tokenChk", auth, (req: AuthenticatedRequest, res: Response) => {
  // console.log(req.newToken)

  if (req.newToken !== undefined && req.newToken.accessToken) {
    //! accessToken이 유효한 경우
    console.log(1);
    res.status(200).json({ success: true, login: true, info: req.newToken.id });
  } else if (req.newToken !== undefined && req.newToken.accessToken === false) {
    //! accessToken은 만료됨, But refreshToken은 유효함
    // 새로운 accessToken을 생성하여 res로 보내줌
    console.log(2);
    res
      .cookie("access", req.newToken.newAccessToken)
      .status(200)
      .json({ success: true, login: true, info: req.newToken.id });
    //
  } else if (req.newToken !== undefined && !req.newToken.refreshToken) {
    //! accessToken, refreshToken 모두 만료됨.
    //? 쿠키 삭제
    console.log(3);
    res.clearCookie("access");
    res.clearCookie("refresh");
    res.status(200).json({ success: false, login: false });
  } else {
    //! 로그인하지 않고 접속(access, refresh 둘다 아예 없음)
    console.log(4);
    res.status(200).json({ success: true, login: false });
  }
});

export default router;
