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
import { isAdmin } from "../middlewares/isAdmin.mjs";

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post("/", createUser);
userRouter.get("/", isAdmin, getUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id/role", changeUserRole);

export default userRouter;
