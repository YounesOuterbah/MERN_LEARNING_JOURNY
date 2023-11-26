const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Book } = require("../models/Books");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author", ["_id", "firstName", "lastName"]);
    res.send(books);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = Book.findById(req.params.id).populate("author");
    book ? res.status(200).json(book) : res.status(404).json({ message: "book not found" });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      author: Joi.string().trim().required(),
      price: Joi.number().min(3).required(),
    });

    const { error } = schema.validate(req.body);

    error && res.status(400).json({ message: error.details[0].message });

    const book = new Book({
      name: req.body.name,
      author: req.body.author,
      price: req.body.price,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().trim(),
      author: Joi.string().trim(),
      price: Joi.number().min(3),
    });

    const { error } = schema.validate(req.body);

    error && res.status(400).json({ message: error.details[0].message });

    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          author: req.body.author,
          price: req.body.price,
        },
      },
      { new: true }
    );
    res.status(200).json(updateBook);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    book
      ? (await Book.findByIdAndDelete(req.params.id),
        res.status(200).json({ message: "Book Has Been Deleted" }))
      : res.status(404).json({ message: "Book Not Found" });
  })
);

module.exports = router;
