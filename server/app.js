import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

import stories from './routes/storiesRoutes.js';

import newsletterRoutes from './routes/newsletterRoute.js';


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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
