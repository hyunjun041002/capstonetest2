import { ChatData } from "../data/chat.data.js"

export const ChatServices = {
    getChatrooms: async (user_id) => {
        const result = await ChatData.getChatroomsByUserId(user_id)
        return result[0]
    },

    getMessages: async (chat_id, user_id) => {
        const result = await ChatData.getQuestionByChatroomId(chat_id, user_id)
        return result[0]
    }
}