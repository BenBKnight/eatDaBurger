const express = require("express");
const burgerJs = require("../models/burgerModel")
const router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burgerJs.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/devoured", function (req, res) {
  burgerJs.create([
    "burger_name"
  ], [
    req.body.name
  ], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/devoured/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  burgerJs.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      console.log("here")
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burgerJs.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
