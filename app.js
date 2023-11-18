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
  const user = req.body;
  const foundUser = users.find((acc) => acc.id == user.id);
  if (foundUser) {
    res.status(400).send("user already exists");
    return;
  }
  users.push(user);
  res.status(201).send("Created!");
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUserIndex = users.findIndex((x) => x.id === id);
  if (findUserIndex == -1) {
    res.status(400).send("User Not Found");
    return;
  }
  users.splice(findUserIndex, 1);
  res.status(200).send("User Deleted Successfuly");
});

app.listen("3000", () => {
  console.log("server statred on port 3000");
});
