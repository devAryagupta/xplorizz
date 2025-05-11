import express from "express";
import Blog from "../models/Blog.js";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Create blog (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { title, category, content, imageUrl, tags, author } = req.body;
    const blog = await Blog.create({ title, category, content, imageUrl, tags, author });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all blogs with optional filtering & search
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.search)
      query.title = { $regex: req.query.search, $options: "i" };
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update blog (protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete blog (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json({ msg: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Approve or update a blog post
router.put("/:id/approve", adminAuth, async (req, res) => {
  try {
    // Assume we add an "approved" field to the Blog model
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!updatedBlog) return res.status(404).json({ msg: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;