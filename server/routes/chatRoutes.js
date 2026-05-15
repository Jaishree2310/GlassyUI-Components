import express from 'express';
import { sendMessage, healthCheck } from '../controllers/chatController.js';

const router = express.Router();

/**
 * POST /api/chat
 * Send a message to the chatbot and get AI response
 * Body: { message: "user message" }
 */
router.post('/', sendMessage);

/**
 * GET /api/chat/health
 * Check if the chat service is operational
 */
router.get('/health', healthCheck);

export default router;
