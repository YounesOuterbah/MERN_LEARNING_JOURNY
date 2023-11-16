const { log } = require("console");
const express = require("express");

const app = express();
log(express);

app.listen(3000, () => {
  console.log("am listening at port 3000 ");
});
/// you can use nodemon to dont restart the server each time you made changes
