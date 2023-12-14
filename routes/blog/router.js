import express from "express";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../../controllers/blog/blogController.js";
import {verifyToken} from "../../middlewares/verifyToken/verifyToken.js"

const router = express.Router();

router.get("/api/blog",getAllBlogs);
router.post("/api/blog/create",verifyToken,createBlog);
router.put("/api/blog/update/:id",verifyToken,updateBlog);
router.delete("/api/blog/delete/:id",verifyToken,deleteBlog);

export default router;
