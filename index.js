import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import dbConnect from "./config/dbConnect.js";
import userRouter from "./routes/user/router.js";
import { errorHandler, notFound } from "./middlewares/error/errorHandler.js";
import blogRouter from "./routes/blog/router.js";

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());


app.use(userRouter);
app.use(blogRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
