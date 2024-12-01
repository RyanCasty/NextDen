import express from "express";
import { chatWithOpenAI } from "../controllers/chatbot.js";

const router = express.Router();

// Chatbot route
router.post("/chat", chatWithOpenAI);

export default router;
