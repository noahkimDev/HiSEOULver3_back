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
const Association_1 = require("../models/Instances/Association");
const router = express_1.default.Router();
router.post("/saveComment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body, "here");
    try {
        if (req.body.userId) {
            const { comment, userId, userName, exhibitionNum } = req.body;
            // console.log(req.body, "check");
            Association_1.Comment.create({
                userId: Number(userId) || null,
                userName: userName || "visitor",
                exhibitionNum: exhibitionNum,
                comment: comment,
            });
        }
        else {
            const { comment, password, userName, exhibitionNum } = req.body;
            // console.log(comment, password, userName, exhibitionNum);
            Association_1.Comment.create({
                userName: userName,
                exhibitionNum: exhibitionNum,
                comment: comment,
                password: String(password),
            });
        }
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.log("Error***********************2");
    }
}));
router.get("/bringAllComments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req.query;
    // console.log(params);
    try {
        const allComments = yield Association_1.Comment.findAll({
            include: [
                {
                    model: Association_1.User,
                    attributes: ["name", "email"],
                },
            ],
            where: { exhibitionNum: params },
        });
        yield res.status(200).json({ success: true, allComments });
    }
    catch (error) {
        console.log("Error**********************");
    }
}));
router.delete("/deleteComment", (req, res) => {
    const { commentId } = req.query;
    Association_1.Comment.destroy({
        where: { id: commentId },
    });
    res.status(200).json({ success: true });
});
exports.default = router;
