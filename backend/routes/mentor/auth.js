import express from "express";
import { registerMentor, loginMentor } from "../../controller/mentor/authController.js";

const router = express.Router();

router.post("/register", registerMentor);
router.post("/login", loginMentor);

export default router;
