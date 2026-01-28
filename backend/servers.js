const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

/* -------------------- ROUTES -------------------- */

// ✅ GET all users
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD user
app.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE user
app.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE user
app.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------- SERVER -------------------- */

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
