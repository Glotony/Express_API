import express from "express"
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  changeUserRole 
} from "../controllers/userController.mjs"

const userRouter = express.Router()

// CREATE user
userRouter.post("/", createUser)

// READ all users
userRouter.get("/", getUsers)

// READ user by id
userRouter.get("/:id", getUserById)

// UPDATE user by id
userRouter.put("/:id", updateUser)

// DELETE user by id
userRouter.delete("/:id", deleteUser)

// CHANGE user role by id
userRouter.put("/:id/role", changeUserRole)

export default userRouter
