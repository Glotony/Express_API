import express from "express"
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole,
  loginUser
} from "../controllers/userController.mjs"
import { isAdmin } from "../middlewares/isAdmin.mjs"
const userRouter = express.Router()

// LOGIN user
userRouter.post('/login', loginUser);


// CREATE user
userRouter.post("/", createUser)

// READ all users
userRouter.get("/", isAdmin, getUsers)

// READ user by id
userRouter.get("/:id", getUserById)

// UPDATE user by id
userRouter.put("/:id", updateUser)

// DELETE user by id
userRouter.delete("/:id", deleteUser)

// CHANGE user role by id
userRouter.put("/:id/role", changeUserRole)

export default userRouter
