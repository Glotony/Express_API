import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

// Routes - ლინკები რომლებზეც ფუნქციები ებმევა
// რომელ ლინკზე რა ფუნქცია შესრულდეს - ესაა როუტის მუშაობის პრინციპი
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogdb';

// MongoDB - მონგოს ბაზასთან დაკავშირება
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// cors - არის ორიჯინის ანუ ვინც მოიხმარს api ს დამმოწმებელი (მაგ: movix api გამოიყენოს მხოლოდ movix მა )
// movix.ge თუ აგზავნის რექვესტს სიტყვაზე ნება მისცეს და სხვას არა (origin = movix.ge)
// ასევე შეუძლია რეგულაცია request ების და credential ების (cookie access tokens)
app.use(cors({
  origin: true,         // allow any origin (for dev)
  credentials: true     // allow sending cookies
}));

// json რომ აღიქვას და ასევე json პასუხები დააბრუნოს res.json()
app.use(express.json());
// cookies - ტოკენები რომ აღიქვას, ამოიღოს რექვესტებიდან
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);


// 404 - ზე უნდა დაწეროს რომ ლინკი არ არსებობს
// ასევე, მუშაობს მაშინ როცა სხვა დანარჩენი ლინკებს არ ემთხვევა route
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found." });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is live at: http://localhost:${PORT}`);
});
