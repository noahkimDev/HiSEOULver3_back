"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const contents_1 = __importDefault(require("./routes/contents"));
const data_1 = __importDefault(require("./routes/data"));
const Index_1 = __importDefault(require("./models/Index"));
const app = (0, express_1.default)();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 7000;
require("dotenv").config();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//! Testing the connection
Index_1.default
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
app.use("/api/data", data_1.default);
app.use("/api/users", users_1.default);
app.use("/api/contents", contents_1.default);
app.use((err, req, res, next) => {
    console.log("error 발생");
    res.status(500).json({ message: err.message });
});
app.listen(port, () => {
    console.log(`listening on the port : ${port}`);
});
