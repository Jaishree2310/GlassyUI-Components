import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

import stories from './routes/storiesRoutes.js';

import newsletterRoutes from './routes/newsletterRoute.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000', // replace with your frontend origin
  }),
);

// Serve static files from the uploads directory
app.use('/api/contact', contactRoutes);

app.use('/api/stories', stories);

app.use('/api/newsletter', newsletterRoutes);

// Chat API endpoint - Gemini chatbot
app.use('/api/chat', chatRoutes);

// Root route for API status
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GlassyUI API Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
