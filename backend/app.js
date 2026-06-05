import express from 'express'
import bodyParser from 'body-parser'
import authRouter from './routes/auth.routes.js'
import 'dotenv/config'
import path from "path"
import { dbPlay } from './utils/db.utils.js'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// app.js 상단에 임시로 추가
console.log(process.env.GEMINI_API_KEY)
// ── 미들웨어 ──────────────────────────────
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "../frontend")))

// ── 라우터 ───────────────────────────────
app.use('/auth', authRouter)

// ── 기본 헬스 체크 ───────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/index.html"))
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/login.html"))
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/html/signup.html"))
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`)
})
