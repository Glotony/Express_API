import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postsController.mjs";

import { authCheck ,ownerOrAdmin} from "../middlewares/roleCheck.mjs";

const postRouter = express.Router();

// Create a new post
postRouter.post("/", authCheck, createPost);

// Get all posts
postRouter.get("/", getAllPosts);

// Get a single post by ID
postRouter.get("/:id", getPostById);


// Update a post by ID
postRouter.put("/:id", ownerOrAdmin, updatePost);

// Delete a post by ID
postRouter.delete("/:id", ownerOrAdmin, deletePost);

export default postRouter;
