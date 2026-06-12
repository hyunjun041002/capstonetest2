import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { aiPlay } from "./utils/ai.utils.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { ChatData } from "./data/chat.data.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── 미들웨어 ──────────────────────────────
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

// ── 라우터 ───────────────────────────────
app.use("/auth", authRouter);
app.use("/api", chatRouter);

// ── 페이지 라우트 ─────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/signup.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
