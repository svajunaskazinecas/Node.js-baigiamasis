import express from "express";
const router = express.Router();

import { signUp, login, getNewJwtToken } from "../controller/auth.js";
import { getAllUsers, getUserById } from "../controller/user.js";
import { auth } from "../middleware/auth.js";
import { buyTicket } from "../controller/ticket.js";

router.post("/register", signUp);
router.post("/login", auth, login);
router.post("/token", getNewJwtToken);
router.get("/user", auth, getAllUsers);
router.get("/user/:id", auth, getUserById);
router.post("/ticket", auth, buyTicket);

export default router;
