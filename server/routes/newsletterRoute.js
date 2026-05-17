import express from 'express';
import {
  getNewsletter,
  saveNewsletter,
} from '../controllers/newsletterController.js';
import { writeLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/subscribe', writeLimiter, saveNewsletter);
router.get('/getNewsletter', getNewsletter);

export default router;
