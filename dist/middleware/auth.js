"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body, "body");
    const { id } = req.body;
    //! 유효기간이 끝난 cookie  는 jwt.verify에서 문제가 생김
    // console.log(req.cookies.access, "쿠키");
    if (req.cookies.access) {
        try {
            //
            const accessTokenChk = jwt.verify(req.cookies.access, process.env.ACCESS_TOKEN_KEY);
            // console.log(accessTokenChk, "???");
            //
            // console.log( typeof accessTokenChk.data);
            req.newToken = { accessToken: true, id: accessTokenChk.data };
            console.log("accessTokenChk 유효");
            next();
            //
        }
        catch (error) {
            console.log("accessToken 만료");
            try {
                const refreshTokenChk = jwt.verify(req.cookies.refresh, process.env.REFRESH_TOKEN_KEY);
                console.log("refreshToken 유효");
                //! 새로운 access 토큰 생성 및 전달
                const newAccessToken = jwt.sign({ data: refreshTokenChk.data }, process.env.ACCESS_TOKEN_KEY, { expiresIn: 60 * 1 });
                req.newToken = {
                    accessToken: false,
                    newAccessToken,
                    id: newAccessToken.data,
                };
                next();
            }
            catch (error) {
                console.log("refreshToken 만료");
                req.newToken = { refreshToken: false };
                next();
            }
        }
    }
    else {
        //! solution : 회원가입 없이 접속
        console.log("No", req.cookies.access);
        next();
    }
});
exports.auth = auth;
