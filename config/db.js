const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Connection Failed To MongoDB!", error);
  }
}

module.exports = connectToDB;
