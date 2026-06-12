import { ChatData } from "../data/chat.data.js";
import { aiPlay } from "../utils/ai.utils.js";

export const ChatServices = {
  sendQuestion: async (message, chatroom_id, user_id) => {
    let room_id = chatroom_id;

    try {
      if (!room_id) {
        const result = await ChatData.createChatroom(user_id);
        room_id = result[0].insertId;
      }

      const reply = await aiPlay(message);
      await ChatData.saveQuestion(room_id, user_id, message, reply);
      return reply;
    } catch (err) {
      throw err;
    }
  },

  getChatrooms: async (user_id) => {
    try {
      const result = await ChatData.getChatroomsByUserId(user_id);
      return result[0];
    } catch (err) {
      throw err;
    }
  },

  getMessages: async (chat_id, user_id) => {
    try {
      const result = await ChatData.getQuestionByChatroomId(chat_id, user_id);
      return result[0];
    } catch (err) {
      throw err;
    }
  },
};
