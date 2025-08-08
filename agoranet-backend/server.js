const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",        // local dev
  "https://agoranet1.vercel.app", // deployed frontend
];

// ✅ Parse JSON bodies
// IMPORTANT ::: express.json() must come before any routes that read req.body
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// Connect DB
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
