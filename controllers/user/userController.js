import asyncHandler from "express-async-handler";
import User from "../../models/user/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});
