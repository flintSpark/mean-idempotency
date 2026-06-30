import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createOrder } from './order.controller.js';

const app = express();
const PORT = 3000;

// 1. Enable Middleware
app.use(cors({ origin: 'http://localhost:4200' })); // Allow your Angular frontend access
app.use(express.json()); // Parse JSON payloads

// 2. Connect to MongoDB (Assumes local installation. Adjust string if using Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/ltm_demo')
  .then(() => console.log('🍃 MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// 3. Register the Route
app.post('/api/orders', createOrder);

// 4. Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Logged Error:', err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
