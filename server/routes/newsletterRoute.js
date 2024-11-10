import express from 'express';
const router = express.Router();
import {
  getNewsletter,
  saveNewsletter,
} from '../controllers/newsletterController.js';

router.post('/subscribe', saveNewsletter);
router.get('/getNewsletter', getNewsletter);

export default router;
