import express, { Request, Response, NextFunction } from "express";
import axios from "axios";

const router = express.Router();

require("dotenv").config();

//! 전시회 data
router.get(
  "/seoulExhibitions",
  (req: Request, res: Response, next: NextFunction) => {
    function dataRequest() {
      const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/EnglishListExhibitionOfSeoulMOAInfo/0/`;
      const info = axios(url + 1);
      return info;
    }

    dataRequest().then((info) => {
      res.status(200).json({ success: true, result: info.data });
    });
  }
);

//! 동물병원 data
router.get("/vetinfo", async (req: Request, res: Response) => {
  await axios
    .get(
      `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/LOCALDATA_020301/1/20/`
    ) //
    .then((info) => {
      const vets = info.data;
      res.status(200).json({ success: true, vets });
    });
});

//! 약국 data
router.get("/pharmacyInfo", async (req: Request, res: Response) => {
  await axios
    .get(
      `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/LOCALDATA_010106/1/20/
  `
    ) //
    .then((info) => {
      const pharmacies = info.data;
      res.status(200).json({ success: true, pharmacies });
    });
});

export default router;
