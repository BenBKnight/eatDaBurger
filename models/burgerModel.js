// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burgerModel = {
  // Sends Table name and call back to ORM
  all: function (cb) {
    orm.all("burgers", function (res) {
      cb(res);
    });
  },
  // Sends table name, columns, values, and call back to orm
  create: function (cols, vals, cb) {
    orm.create("burgers", cols, vals, function (res) {
      cb(res);
    });
  },
  // Sends table name, changed data, id and callback to orm
  update: function (objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function (res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller
module.exports = burgerModel;
