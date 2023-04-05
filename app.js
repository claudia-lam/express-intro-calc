/** Simple demo Express app. */

const express = require("express");
const app = express();

const { findMean, findMode, findMedian } = require("./stats.js");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils.js");

app.use(express.json()); // process JSON data
app.use(express.urlencoded());  // process trad form data

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res) {
  const queries = req.query
  console.log("queries-mean", queries);

  if (queries.nums !== ''){
    const nums = convertStrNums(queries.nums);
    console.log("nums", nums);
    const mean = findMean(nums);
    return res.json({response: {operation: "mean", value: mean}})
  } else {
    throw new BadRequestError("nums are required");
  }
})

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;