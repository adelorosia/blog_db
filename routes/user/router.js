import express from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  registerUser,
} from "../../controllers/user/userController.js";
import { refreshToken } from "../../controllers/user/refreshToken.js";
import { verifyToken } from "../../middlewares/verifyToken/verifyToken.js";

const router = express.Router();

router.get("/token", refreshToken);

router.post("/api/login", loginUser);
router.post("/api/register", registerUser);

router.get("/api/user", getAllUsers);
router.get("/api/user/display", verifyToken, getUser);

export default router;
