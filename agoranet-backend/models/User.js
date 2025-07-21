const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    default: "student",
  },
  trustScore: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    default: "",
  },
  anonymousPostCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
