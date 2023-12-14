import asyncHandler from "express-async-handler";
import Blog from "../../models/blog/blogModel.js";

export const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.json(error);
  }
});

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const id = req.userId;
    const { title, content, blogPhoto } = req.body;
    await Blog.create({ userId: id, title, content, blogPhoto });
    res.json("Ihr Beitrag wurde erfolgreich abgeschickt");
  } catch (error) {
    res.json(error);
  }
});

export const updateBlog = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (blog && userId === blog.userId) {
    await Blog.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title:req.body.title,
        content:req.body.content,
        blogPhoto:req.body.blogPhoto,
      }
    );
    res.json("Die Bearbeitung des Beitrags wurde erfolgreich abgeschlossen");
  } else {
    throw new Error(
      "Sie haben nicht die Erlaubnis, diesen Beitrag zu bearbeiten"
    );
  }
});

export const deleteBlog = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const blog = await Blog.findById(id);
  if (blog && userId === blog.userId) {
    await Blog.findByIdAndDelete(
      { _id: req.params.id },
    );
    res.json("Der Beitrag wurde erfolgreich gelöscht");
  } else {
    throw new Error(
      "Sie haben nicht die Erlaubnis, diesen Beitrag zu löschen"
    );
  }
});
