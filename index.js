const mongoose = require("mongoose");
const todos = require("./routes/todos");
const express = require("express");
const app = express();

/*

Mongodb connection local

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...")); */

// mongodb connection string should be set in the environment variable
// The hardcoded connection string is for portfolio/demo purpose only
mongoose
  .connect(
    "mongodb+srv://argene_tanyong@yahoo.com:Webtools_3123@cluster0.mfkia.mongodb.net/todoBE?authSource=admin&replicaSet=atlas-cvlux3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  )
  .then(() => console.log("Connected to Remote MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/todos", todos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
