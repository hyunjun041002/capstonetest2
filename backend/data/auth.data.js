import { dbPlay } from "../utils/db.utils.js";

export const AuthData = {
  // 유저 정보 가져오기
  getUserById: async (id) => {
    try {
      let query = "select * from users where id = ?";
      let data = [id];
      return dbPlay(query, data);
    } catch {}
  },
  //   회원가입
  register: async (id, name, password) => {
    try {
      let query = `insert into users values (?,?,?, default)`;
      let data = [id, name, password];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
    }
  },
};
