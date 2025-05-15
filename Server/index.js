const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Todo = require("./models/todo.models.js");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/get", async (req, res) => {
  const todos = Todo.find()
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch todos" });
    });
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  Todo.create({ task })
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to create todo" });
    });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body; // Extract 'completed' from the body
  Todo.findByIdAndUpdate(id, { completed }, { new: true })
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((err) => res.status(500).json({ error: "Failed to update todo" }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Todo deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to delete todo" });
    });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
