import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
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
    isBlock: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
