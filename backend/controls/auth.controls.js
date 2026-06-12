import { AuthServices } from "../services/auth.services.js";

export const AuthControl = {
  // 회원가입
  signup: async (req, res) => {
    let { id, name, password } = req.body;

    try {
      let result = await AuthServices.signup(id, name, password);
      res.status(201).json({ message: "회원가입 성공!" });
    } catch (error) {
      console.log(error);
    }
  },
  // 로그인
  login: async (req, res) => {
    let { id, password } = req.body;
    try {
      let token = await AuthServices.login(id, password);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: "로그인 성공!" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  // 로그아웃
  logout: async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "로그아웃 성공!" });
  },
};
