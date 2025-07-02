import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  loginUser
} from "../controllers/userController.mjs";

import { isAdmin,ownerOrAdmin } from "../middlewares/roleCheck.mjs";

const userRouter = express.Router();

// LOGIN user
userRouter.post('/login', loginUser);

// CREATE user 
userRouter.post("/", createUser);

// READ all users (protected: only admin can view full list)
userRouter.get("/", isAdmin, getUsers);

// READ one user by ID 
userRouter.get("/:id", ownerOrAdmin, getUserById);

// UPDATE user by ID 
userRouter.put("/:id",ownerOrAdmin, updateUser);

// DELETE user by ID 
userRouter.delete("/:id", isAdmin, deleteUser);

// CHANGE user role
userRouter.put("/:id/role", isAdmin, changeUserRole);

export default userRouter;
