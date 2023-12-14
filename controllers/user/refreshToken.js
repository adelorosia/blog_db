import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/user/userModel.js";

export const refreshToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findOne({ refresh_token: refreshToken });
    if (!user) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user._id;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;
        const admin = user.isAdmin;
        const photo = user.profilePhoto;
        const accessToken = jwt.sign(
          {
            userId,
            firstName,
            lastName,
            email,
            admin,
            photo,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.json(error);
  }
});
