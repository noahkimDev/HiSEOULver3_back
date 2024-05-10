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
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
require("dotenv").config();
//! 전시회 data
router.get("/seoulExhibitions", (req, res, next) => {
    function dataRequest() {
        const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/EnglishListExhibitionOfSeoulMOAInfo/0/`;
        const info = (0, axios_1.default)(url + 1);
        return info;
    }
    dataRequest().then((info) => {
        res.status(200).json({ success: true, result: info.data });
    });
});
//! 동물병원 data
router.get("/vetinfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default
        .get(`http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/LOCALDATA_020301/1/20/`) //
        .then((info) => {
        const vets = info.data;
        res.status(200).json({ success: true, vets });
    });
}));
//! 약국 data
router.get("/pharmacyInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default
        .get(`http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/LOCALDATA_010106/1/20/
  `) //
        .then((info) => {
        const pharmacies = info.data;
        res.status(200).json({ success: true, pharmacies });
    });
}));
exports.default = router;
