import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
