const express = require("express");
const validate = require("./middlewares/validate_address");
const task1 = require("./tasks/callbacks");
const task2 = require("./tasks/async");
const task3 = require("./tasks/rsvp");
const task4 = require("./tasks/rxjs");

const app = express();
const port = 3000;
app.get("/I/want/title", validate, async (req, res, next) => {
  try {
    task1(req, res, next);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
