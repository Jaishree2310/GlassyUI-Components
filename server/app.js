import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import stories from './routes/storiesRoutes.js';
import newsletterRoutes from './routes/newsletterRoute.js';
import { apiLimiter } from './middleware/rateLimit.js';

dotenv.config();
const app = express();
connectDB();

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    methods: ['GET', 'POST'],
  }),
);

app.use(express.json({ limit: '32kb' }));
app.use(apiLimiter);

app.use('/api/contact', contactRoutes);
app.use('/api/stories', stories);
app.use('/api/newsletter', newsletterRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
