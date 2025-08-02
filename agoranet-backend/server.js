// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// import cors from "cors";

dotenv.config();            // Load environment variables from .env
connectDB();                // Connect to MongoDB

const app = express();

// --- test --- test --- test --- test --- test --- test --- test --- test --- test --- test ---
app.get("/api/ping", (req, res) => {
  res.json({ message: "111 pong from backend" });
});
// --- test --- test --- test --- test --- test --- test --- test --- test --- test --- test ---

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Middlewares
app.use(cors());
app.use(express.json());    // Parse JSON bodies
app.options('*', cors());

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Post Routes
const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

// ----------------------------------------------------
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

// ----------------------------------------------------
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Fallback Route (Optional – to handle invalid routes)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

