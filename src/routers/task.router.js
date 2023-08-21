const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth.middleware");

const taskRouter = express.Router();

taskRouter.get("", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    const match = {};
    const sort = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1].toLowerCase() === "desc" ? -1 : 1;
    }
    if (!req.query.limit || !req.query.skip) {
      req.query.limit = 10;
      req.query.skip = 0;
    }
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.get("/:id", auth, async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("ID not provided!");
    }
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.post("", auth, async (req, res) => {
  try {
    const { description, completed } = req.body;
    const task = new Task({
      description,
      completed,
      owner: req.user._id,
    });
    const result = await task.save();
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.patch("/:id", auth, async (req, res) => {
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
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

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

taskRouter.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = taskRouter;
