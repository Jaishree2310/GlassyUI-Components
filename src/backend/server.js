const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./userModal');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();
connectDB();
const app = express();
var corsOptions = {
  origin: 'http://localhost:3000', // No trailing slash
  methods: 'GET,POST,PUT,DELETE,PATCH,HEAD',
  credentials: true, // Include this if you're dealing with credentials
};
app.use(cors(corsOptions)); // This should be before your routes

app.use(express.json());

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An error occurred during signup.');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
