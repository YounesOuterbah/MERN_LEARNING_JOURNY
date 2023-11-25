const express = require("express");
const app = express();
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/storedb")
  .then(() => console.log("Connected To MongoDB"))
  .catch((error) => console.log("Connection Failed To MongoDB", error));

app.use(express.json());

app.use("/books", booksPath);
app.use("/authors", authorsPath);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
