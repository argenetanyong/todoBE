const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Todo = mongoose.model(
  "Todos",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  })
);

router.get("/", async (req, res) => {
  const todos = await Todo.find().select("-__v").sort("name");
  res.send(todos);
});

router.post("/", async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({ name: req.body.name, completed: req.body.completed });
  todo = await todo.save();

  res.send(todo);
});

router.put("/:id", async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, completed: req.body.completed },
    {
      new: true,
    }
  );

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndRemove(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  res.send(todo);
});

function validateTodo(todo) {
  const schema = {
    name: Joi.string().min(3).required(),
    completed: Joi.boolean().required(),
  };

  return Joi.validate(todo, schema);
}

module.exports = router;