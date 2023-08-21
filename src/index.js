const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
require("./db/mongose");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    console.log(name, email, age);
    const user = new User({ name, email, age });
    const result = await user.save();
    console.log("user", user);
    console.log("result", result);
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    if (!req.params.id) {
      throw new Error("ID not provided!!");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    if (!req.params.id) {
      throw new Error("ID not provided!!");
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { description, completed } = req.body;
    console.log(description, completed);
    const task = new Task({
      description,
      completed,
    });
    const result = task.save();
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
