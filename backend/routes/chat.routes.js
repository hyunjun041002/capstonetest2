import express from "express"
import { ChatControl } from "../controls/chat.controls.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/rooms", authMiddleware, ChatControl.getChatrooms)
router.get("/rooms/:chat_id", authMiddleware, ChatControl.getMessages)

export default router