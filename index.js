const mongoose = require("mongoose");
const todos = require("./routes/todos");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/todos", todos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
