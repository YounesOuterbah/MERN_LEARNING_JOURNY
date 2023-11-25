const express = require("express");
const router = express.Router();
const { Author } = require("../models/Authors");

router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find();
    res.send(authorList);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    author ? res.status(200).json(author) : res.status(404).json({ message: "Author Not Found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      img: req.body.img,
    });

    const result = await author.save();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

router.put("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
