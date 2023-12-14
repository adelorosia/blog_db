import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/user/userModel.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser)
    {
      throw new Error(
        "Ein Benutzer mit dieser E-Mail-Addresse ist bereit registeriert"
      );
    }
  try {
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.json("Sie haben sich erfolgreich registeriert.");
  } catch (error) {
    res.json(error);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser && await foundUser.isPasswordMatched(password)) {
    const userId = foundUser._id;
    const firstName = foundUser.firstName;
    const lastName = foundUser.lastName;
    const email = foundUser.email;
    const admin = foundUser.isAdmin;
    const photo = foundUser.profilePhoto;
    const accessToken = foundUser.accessToken;
    const token = jwt.sign(
      {
        userId,
        firstName,
        lastName,
        email,
        admin,
        photo,
        accessToken,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await User.findByIdAndUpdate(userId, { accessToken:token });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ token });
  } else {
    throw new Error("Die E-mail-Addresse oder der Password ist nicht korrekt");
  }
});
