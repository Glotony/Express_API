import express from "express"

import { createUser,changeUserRole } from "../controllers/userController.mjs"


const userRouter = express.Router()

userRouter.post("/", createUser)

userRouter.put('/:id/role', changeUserRole); // 👈 PUT route to change user role


export default userRouter
