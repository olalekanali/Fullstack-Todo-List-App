// index.js (or server.js)
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const dotenv   = require("dotenv");
const Todo     = require("./models/todo.models.js");

dotenv.config();
const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://todo-list-applicationn.vercel.app/"
    // In production, change "*" → your Vercel URL, e.g.:
    // origin: "https://your-vite-app.vercel.app"
  })
);

// ─── ROOT (optional sanity check) ───────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("✔️ Todo API is running");
});

// ─── GET ALL TODOS ───────────────────────────────────────────────────────────────
app.get("/api/todos", async (req, res) => {
  try {
    // Sort by creation date descending (newest first)
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// ─── CREATE A NEW TODO ───────────────────────────────────────────────────────────
app.post("/api/todos", async (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Task is required" });
  }

  try {
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// ─── TOGGLE (UPDATE) A TODO’S COMPLETED STATUS ───────────────────────────────────
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true } // return the updated document
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// ─── DELETE A TODO ───────────────────────────────────────────────────────────────
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// ─── MONGODB CONNECTION + SERVER START ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("🌱 Connected to MongoDB successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
