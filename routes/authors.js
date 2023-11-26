const express = require("express");
const router = express.Router();
const { Author } = require("../models/Authors");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorList = await Author.find();
    res.send(authorList);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    author ? res.status(200).json(author) : res.status(404).json({ message: "Author Not Found" });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      img: req.body.img,
    });

    const result = await author.save();

    res.status(200).json(result);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          img: req.body.img,
        },
      },
      { new: true }
    );

    res.status(200).json(author);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    author
      ? (await Author.findByIdAndDelete(req.params.id),
        res.status(200).json({ message: "author has been deleted" }))
      : res.status(404).json({ message: "author not found" });
  })
);

module.exports = router;
