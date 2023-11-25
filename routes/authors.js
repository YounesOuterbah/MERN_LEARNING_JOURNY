const express = require("express");
const router = express.Router();

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

router.post("/", (req, res) => {
  const author = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    img: req.body.img,
  };
  authors.push(author);
  res.status(200).json(author);
});

module.exports = router;
