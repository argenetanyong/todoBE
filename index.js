const mongoose = require("mongoose");
const todos = require("./routes/todos");
const express = require("express");
const app = express();

/*

Mongodb connection local

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));
*/

// mongodb connection string should be set in the environment variable
// The hardcoded connection string is for portfolio/demo purpose only
/* mongoose
  .connect("mongodb+srv://logan:14344@cluster0.mfkia.mongodb.net/todoBE")
  .then(() => console.log("Connected to REMOTE MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));
*/

mongoose
  .connect(
    "mongodb://logan:14344@cluster0-shard-00-00.mfkia.mongodb.net:27017,cluster0-shard-00-01.mfkia.mongodb.net:27017,cluster0-shard-00-02.mfkia.mongodb.net:27017/todoBE?ssl=true&replicaSet=atlas-cvlux3-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to THE REMOTE MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/todos", todos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
