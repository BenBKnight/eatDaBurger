const express = require("express");
const burgerModel = require("../models/burgerModel")
const router = express.Router();


// Create all our routes

// Calls all data from burger table to be displayed
router.get("/", function (req, res) {
  burgerModel.all(function (data) {
    var burgerData = {
      burgers: data
    };
    res.render("index", burgerData);
  });
});
// Sends column name, user input, and callback to model
router.post("/api/devoured", function (req, res) {
  burgerModel.create([
    "burger_name"
  ], [
    req.body.name
  ], function (result) {
    // Send back the ID
    res.json({ id: result.insertId });
  });
});
// Updates devoured property
router.put("/api/devoured/:id", function (req, res) {
  // Sets Id to be sent to model
  var condition = "id = " + req.params.id;
  // Sends new devoured property, id, and callback to model 
  burgerModel.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
