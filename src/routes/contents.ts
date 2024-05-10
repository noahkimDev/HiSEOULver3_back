import express, { Request, Response, NextFunction } from "express";

import { Comment, User } from "../models/Instances/Association";

const router = express.Router();

router.post("/saveComment", async (req: Request, res: Response) => {
  // console.log(req.body, "here");

  try {
    if (req.body.userId) {
      const { comment, userId, userName, exhibitionNum } = req.body;
      // console.log(req.body, "check");

      Comment.create({
        userId: Number(userId) || null,
        userName: userName || "visitor",
        exhibitionNum: exhibitionNum,
        comment: comment,
      });
    } else {
      const { comment, password, userName, exhibitionNum } = req.body;
      // console.log(comment, password, userName, exhibitionNum);
      Comment.create({
        userName: userName,
        exhibitionNum: exhibitionNum,
        comment: comment,
        password: String(password),
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error***********************2");
  }
});

router.get("/bringAllComments", async (req: Request, res: Response) => {
  const { params } = req.query;
  // console.log(params);

  try {
    const allComments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
      where: { exhibitionNum: params },
    });
    await res.status(200).json({ success: true, allComments });
  } catch (error) {
    console.log("Error**********************");
  }
});

router.delete("/deleteComment", (req: Request, res: Response) => {
  const { commentId } = req.query;
  Comment.destroy({
    where: { id: commentId },
  });
  res.status(200).json({ success: true });
});

export default router;
