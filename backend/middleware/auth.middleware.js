import jwt from "jsonwebtoken"
import { config } from "../config/env.config.js"

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ message: '로그인이 필요합니다.' })

        const decoded = jwt.verify(token, config.jwt.secret_key)
        req.user = decoded  // { id, name }
        next()
    } catch(err) {
        res.status(401).json({ message: '토큰이 유효하지 않습니다.' })
    }
}