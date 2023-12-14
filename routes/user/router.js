import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../../controllers/user/userController.js";



const router = express.Router();

router.get("/api/user", getAllUsers);
router.post("/api/register", registerUser);
router.post("/api/login", loginUser);

export default router;
