const express = require("express");
const app = express();
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
dotenv.config();

connectToDB();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected To MongoDB"))
  .catch((error) => console.log("Connection Failed To MongoDB", error));

app.use(express.json());
app.use(logger);

app.use("/books", booksPath);
app.use("/authors", authorsPath);
app.use("/auth", authPath);
app.use("/users", usersPath);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);


// almost finished the project