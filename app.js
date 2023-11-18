const express = require("express");

const app = express();

app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.send("Welcome Home");
});

app.get("/users", (req, res) => {
  if (users.length == 0) {
    res.status(404).send("no users found");
  }
  res.send(users);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).send("Created!");
});

app.listen("5000", () => {
  console.log("server statred on port 5000");
});
