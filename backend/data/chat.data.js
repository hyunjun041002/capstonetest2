import { dbPlay } from "../utils/db.utils.js";

export const ChatData = {
  // 채팅방 만들기
  createChatroom: async (user_id) => {
    try {
      let query = `insert into chatroom (user_id) values (?)`;
      let data = [user_id];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //   질문과 답 저장
  saveQuestion: async (chatroom_id, user_id, question, answer) => {
    try {
      let query = `insert into question values (?, ?, ?, ?, default)`;
      let data = [chatroom_id, user_id, question, answer];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //   특정 채팅방에 있는 질문과 답 가져오기
  getQuestionByChatroomId: async (chat_id, user_id) => {
    try {
      let query = `SELECT 
    q.question,
    q.answer,
    q.create_at
FROM question q
INNER JOIN chatroom c
    ON q.chatroom_id = c.id
WHERE c.user_id = ?
  AND c.id = ?
ORDER BY q.create_at ASC;`;
      let data = [user_id, chat_id];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //   특정 유저의 채팅방 가져오기
  getChatroomsByUserId: async (user_id) => {
    try {
      let query = `SELECT id, create_at FROM chatroom WHERE user_id = ? ORDER BY create_at DESC`;
      let data = [user_id];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getUserAlldata: async (id) => {
    try {
      let query = `SELECT 
    u.id,
    u.name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'chatroom_id', c.id,
            'question_list', c.question_list
        )
    ) AS chatrooms
FROM users u
LEFT JOIN (
    SELECT
        ch.id,
        ch.user_id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'question', q.question,
                'answer', q.answer
            )
        ) AS question_list
    FROM chatroom ch
    LEFT JOIN question q
        ON q.chatroom_id = ch.id
       AND q.user_id = ch.user_id
    GROUP BY ch.id, ch.user_id
) c
ON u.id = c.user_id
WHERE u.id = ?
GROUP BY u.id, u.name;`;
      let data = [id];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
