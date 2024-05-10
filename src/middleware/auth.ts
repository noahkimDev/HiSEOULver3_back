/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

interface AuthenticatedRequest extends Request {
  newToken?: unknown;
}
export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body, "body");
  const { id } = req.body;

  interface jwtType {
    data: number;
    iat: number;
    exp: number;
  }

  //! 유효기간이 끝난 cookie  는 jwt.verify에서 문제가 생김
  // console.log(req.cookies.access, "쿠키");
  if (req.cookies.access) {
    try {
      //
      const accessTokenChk: jwtType = jwt.verify(
        req.cookies.access,
        process.env.ACCESS_TOKEN_KEY
      );
      // console.log(accessTokenChk, "???");
      //
      // console.log( typeof accessTokenChk.data);
      req.newToken = { accessToken: true, id: accessTokenChk.data };
      console.log("accessTokenChk 유효");
      next();
      //
    } catch (error) {
      console.log("accessToken 만료");
      try {
        const refreshTokenChk: jwtType = jwt.verify(
          req.cookies.refresh,
          process.env.REFRESH_TOKEN_KEY
        );
        console.log("refreshToken 유효");
        //! 새로운 access 토큰 생성 및 전달
        const newAccessToken = jwt.sign(
          { data: refreshTokenChk.data },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: 60 * 1 }
        );

        req.newToken = {
          accessToken: false,
          newAccessToken,
          id: newAccessToken.data,
        };
        next();
      } catch (error) {
        console.log("refreshToken 만료");
        req.newToken = { refreshToken: false };

        next();
      }
    }
  } else {
    //! solution : 회원가입 없이 접속
    console.log("No", req.cookies.access);
    next();
  }
};
