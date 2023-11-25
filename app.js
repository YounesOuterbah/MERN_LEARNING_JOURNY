const express = require("express");
const app = express();
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");

app.use(express.json());

app.use("/books", booksPath);
app.use("/authors", authorsPath);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
