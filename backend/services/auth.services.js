import { hashedText } from "../utils/bcrypt.utils.js";
import { AuthData } from "../data/auth.data.js";
import { createjwt } from "../utils/jwt.utils.js";
import { compareText } from "../utils/bcrypt.utils.js";

export const AuthServices = {
  //   회원가입
  signup: async (id, name, password) => {
    try {
      let pw = await hashedText(password);
      await AuthData.register(id, name, pw);

      return;
    } catch (err) {
      console.log(err);
    }
  },
  // 로그인
  login: async (id, password) => {
    try {
      let user_data = await AuthData.getUserById(id);
      let hashedPassword = await user_data[0][0].password;
      let isMatch = await compareText(password, hashedPassword);

      if (isMatch == true) {
        let token = await createjwt(
          { id: user_data[0][0].id, name: user_data[0][0].name },
          "access",
        );
        return token;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
