import express from "express"
import { test, updateUser, deleteUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { create, getposts, deletepost, updatepost } from "../controllers/post.controller.js"

const router = express.Router()

router.post("/create", verifyToken, create)
router.get("/getposts", getposts)
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost)
router.put("/updatepost/:postId/:userId", verifyToken, updatepost)


export default router