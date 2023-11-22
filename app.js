const express = require("express");
const app = express();

const books = [
  {
    id: 0,
    name: "Atomic Habits",
    author: "Younes Outerbah",
    price: "22",
  },
  {
    id: 1,
    name: "Sleep Well",
    author: "Mohamed Outerbah",
    price: "20",
  },
];

app.get("/", (req, res) => {
  res.send("Aslamalikom Brother!");
});

app.get("/books", (req, res) => {
  res.json(books);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
