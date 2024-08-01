import express from "express";

import {
  REGISTER,
  LOGIN,
  TOKEN,
  USERS,
  USER_BY_ID,
  TICKET,
} from "../controller/ticket.js";

const router = express.Router();

router.post("/register", REGISTER);
router.post("/login", LOGIN);
router.post("/token", TOKEN);
router.get("/user", USERS);
router.get("/user/:id", USER_BY_ID);
router.post("/ticket", TICKET);

export default router;
