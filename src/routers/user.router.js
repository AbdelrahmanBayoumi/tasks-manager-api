const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    const user = new User({ name, email, age, password });
    const result = await user.save();
    res.status(201).send(result);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
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

userRouter.patch("/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "age", "password"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Updates!" });
    }

    if (!req.params.id) {
      throw new Error("ID not provided!!");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = userRouter;
