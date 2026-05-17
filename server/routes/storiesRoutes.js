import express from 'express';
import { getPosts, savePost } from '../controllers/postsController.js';
import { writeLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.get('/getposts', getPosts);
router.post('/saveposts', writeLimiter, savePost);

export default router;
