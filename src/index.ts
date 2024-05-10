import { Sequelize } from "sequelize";
import express, { Request, Response, NextFunction } from "express";
import Users from "./routes/users";
import Contents from "./routes/contents";
import Data from "./routes/data";

import axios from "axios";

import sequelize from "./models/Index";

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 7000;
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Testing the connection
sequelize
  .sync({ alter: true }) //
  .then(() => {
    console.log("sequelize-db 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

//
//
//
//
// app.get("/", (req: Request, res: Response) => {
//   console.log("");
// });
app.use("/api/data", Data);
app.use("/api/users", Users);
app.use("/api/contents", Contents);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("error 발생");
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`listening on the port : ${port}`);
});
