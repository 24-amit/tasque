import express from "express"
import { userLogin, userRegister } from "./user.controller.js"

const router = express.Router();
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);

export default router;