const express = require("express");
const app = express();
const booksPath = require("./routes/books");

app.use(express.json());

app.use("/books", booksPath);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
