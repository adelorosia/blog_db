import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../../controllers/user/userController.js";



const router = express.Router();

router.post("/api/login", loginUser);
router.post("/api/register", registerUser);

router.get("/api/user", getAllUsers);

export default router;
