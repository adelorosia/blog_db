import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import userRouter from "./routes/router.js";

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter)

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
