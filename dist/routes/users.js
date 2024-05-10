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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const functions_1 = require("./functions");
const auth_1 = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = express_1.default.Router();
const saltRounds = 10;
require("dotenv").config();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body, "회원정보");
    const { email, name, password } = req.body;
    try {
        const result = yield (0, functions_1.signup)(email, name, password);
        // console.log("여기", result);
        if (result) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(200).json({ success: false });
        }
    }
    catch (error) {
        return res.status(400).json({ success: false, error });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { email, password } = req.body;
    const result = yield (0, functions_1.signin)(req.body);
    try {
        if (result) {
            //! 쿠키, jwt
            // console.log(result.dataValues.id, "Here we go!!!");
            const accessTime = 60 * 15;
            const refreshTime = 60 * 60 * 24;
            const accessToken = jwt.sign({ data: result.dataValues.id }, process.env.ACCESS_TOKEN_KEY, { expiresIn: accessTime });
            const refreshToken = jwt.sign({ data: result.dataValues.id }, process.env.REFRESH_TOKEN_KEY, { expiresIn: refreshTime });
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
        }
        else {
            return res.status(200).json({ success: false });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
    }
}));
router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("access");
    res.clearCookie("refresh");
    res.status(200).json({ success: true });
}));
//! navibar component와 연결
router.get("/tokenChk", auth_1.auth, (req, res) => {
    // console.log(req.newToken)
    if (req.newToken !== undefined && req.newToken.accessToken) {
        //! accessToken이 유효한 경우
        console.log(1);
        res.status(200).json({ success: true, login: true, info: req.newToken.id });
    }
    else if (req.newToken !== undefined && req.newToken.accessToken === false) {
        //! accessToken은 만료됨, But refreshToken은 유효함
        // 새로운 accessToken을 생성하여 res로 보내줌
        console.log(2);
        res
            .cookie("access", req.newToken.newAccessToken)
            .status(200)
            .json({ success: true, login: true, info: req.newToken.id });
        //
    }
    else if (req.newToken !== undefined && !req.newToken.refreshToken) {
        //! accessToken, refreshToken 모두 만료됨.
        //? 쿠키 삭제
        console.log(3);
        res.clearCookie("access");
        res.clearCookie("refresh");
        res.status(200).json({ success: false, login: false });
    }
    else {
        //! 로그인하지 않고 접속(access, refresh 둘다 아예 없음)
        console.log(4);
        res.status(200).json({ success: true, login: false });
    }
});
exports.default = router;
