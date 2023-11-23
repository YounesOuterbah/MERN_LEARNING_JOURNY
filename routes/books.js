const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  {
    id: 0,
    name: "Atomic Habits",
    author: "Younes Outerbah",
    price: 22,
  },
  {
    id: 1,
    name: "Sleep Well",
    author: "Mohamed Outerbah",
    price: 20,
  },
];

router.get("/", (req, res) => {
  res.send(books);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((x) => x.id === +id);
  book ? res.status(200).json(book) : res.status(404).json({ message: "book not found" });
});

router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    price: Joi.number().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  error && res.status(400).json({ message: error.details[0].message });

  const book = {
    id: books.length,
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  };
  books.push(book);
  res.status(201).json(book);
});

module.exports = router;
