import express from "express"
import { test, updateUser, deleteUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { create, getposts } from "../controllers/post.controller.js"

const router = express.Router()

router.post("/create", verifyToken, create)
router.get("/getposts", getposts)



export default router