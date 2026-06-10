import { ChatServices } from "../services/chat.services.js"

export const ChatControl = {
    getChatrooms: async (req, res) => {
        try {
            const user_id = req.user.id
            const result = await ChatServices.getChatrooms(user_id)
            res.status(200).json(result)
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    },

    getMessages: async (req, res) => {
        try {
            const user_id = req.user.id
            const chat_id = req.params.chat_id
            const result = await ChatServices.getMessages(chat_id, user_id)
            res.status(200).json(result)
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }
}