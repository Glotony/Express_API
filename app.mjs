import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

// Routes
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb';

// MongoDB connection (clean, no deprecated options)
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors({
  origin: true,         // allow any origin (for dev)
  credentials: true     // allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🔥 API is working! Try /users or /posts');
});

// 404 fallback route
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found." });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is live at: http://localhost:${PORT}`);
});
