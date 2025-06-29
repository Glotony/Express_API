import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postsController.mjs";

import { isAdmin } from "../middlewares/isAdmin.mjs";

const postRouter = express.Router();

postRouter.post("/", createUser);

// postRouter.post("/reset/password", changePassword);

postRouter.get("/",  getUsers);
postRouter.get("/:id",  getUserById);
postRouter.put("/:id",  updateUser);
postRouter.delete("/:id",  deleteUser);

export default postRouter;
