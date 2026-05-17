import express from 'express';
import { getContact, saveContact } from '../controllers/contactController.js';
import { writeLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/saveContact', writeLimiter, saveContact);
router.get('/saveContact', getContact);

export default router;
