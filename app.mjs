import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import route handlers
import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogdb";


// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware setup
app.use(cors({
  origin: true,        // Allow all origins for dev (adjust in production!)
  credentials: true    // Allow cookies to be sent cross-origin
}));

app.use(express.json());  // Parse JSON bodies
app.use(cookieParser());  // Parse cookies (for JWT auth, etc.)

// Mount routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found." });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is live at: http://localhost:${PORT}`);
});
