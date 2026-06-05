import express , { Router } from "express"
import { AuthControl } from "../controls/auth.controls.js"

const router = express.Router() 

router.post("/login", AuthControl.login )

router.delete("/logout", AuthControl.logout )

router.post("/signup", AuthControl.signup )

export default router
