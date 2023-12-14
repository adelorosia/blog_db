import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePhoto: {
    type: String,
    default:
      "https://res.cloudinary.com/ddruqkbvb/image/upload/v1702504687/ujzsldxkoup07e6el2x1.webp",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
