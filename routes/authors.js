const express = require("express");
const router = express.Router();
const { Author } = require("../models/Authors");

const authors = [
  {
    id: 1,
    firstName: "Younes",
    lastName: "Outerbah",
    nationality: "Algerian",
    img: "default-img.png",
  },
  {
    id: 2,
    firstName: "Mohamed",
    lastName: "Outerbah",
    nationality: "Algerian",
    img: "default-img.png",
  },
];

router.get("/", (req, res) => {
  res.send(authors);
});

router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === +a.id);
  author ? res.status(200).json(author) : res.status(404).json({ message: "author not found" });
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

router.put("/:id", (req, res) => {
  const author = authors.find((b) => b.id === parseInt(req.params.id));
  author
    ? res.status(200).json({ message: "Author Has Been Updated" })
    : res.status(404).json({ message: "Author Not Found" });
});

module.exports = router;
