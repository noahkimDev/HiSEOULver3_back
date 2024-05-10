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
exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Association_1 = require("../models/Instances/Association");
// 회원가입 입력한 회원정보와 일치하는 회원이 있는지
// 비밀번호까지 bcrypt compare를 사용하여 비교
function signup(email, name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const hash = yield bcrypt_1.default.hashSync(password, saltRounds);
            const checkUser = yield Association_1.User.findOne({
                where: {
                    email: email,
                    name: name,
                },
            });
            if (checkUser) {
                const comparePwd = yield bcrypt_1.default.compareSync(password, checkUser.dataValues.password);
                if (comparePwd) {
                    // console.log("1");
                    return false;
                }
                else {
                    // console.log("2");
                    yield Association_1.User.create({ name: name, email: email, password: hash });
                    return true;
                    //   return res.status(200).json({ success: true });
                }
            }
            else {
                yield Association_1.User.create({ name: name, email: email, password: hash });
                return true;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("Error happened");
        }
    });
}
exports.signup = signup;
function signin(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(userInfo, "here");
        const { email, password } = userInfo;
        const findUser = yield Association_1.User.findOne({
            where: {
                email: email,
            },
        });
        if (findUser) {
            const comparePwd = yield bcrypt_1.default.compareSync(password, findUser.dataValues.password);
            if (comparePwd) {
                // 로그인 성공!
                return findUser;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    });
}
exports.signin = signin;
