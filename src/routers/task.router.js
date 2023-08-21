const express = require("express");
const Task = require("../models/task");

const taskRouter = express.Router();

taskRouter.get("", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.get("/:id", async (req, res) => {
  try {
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

taskRouter.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    if (!req.params.id) {
      throw new Error("ID not provided!!");
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(200).send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.post("", async (req, res) => {
  try {
    const { description, completed } = req.body;
    const task = new Task({
      description,
      completed,
    });
    const result = await task.save();
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = taskRouter;
