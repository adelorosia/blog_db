import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    blogPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
