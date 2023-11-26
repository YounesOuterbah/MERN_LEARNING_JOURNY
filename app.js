const express = require("express");
const app = express();
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected To MongoDB"))
  .catch((error) => console.log("Connection Failed To MongoDB", error));

app.use(express.json());

app.use("/books", booksPath);
app.use("/authors", authorsPath);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);
