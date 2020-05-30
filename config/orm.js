// Import MySQL connection.
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  // Array variable declared
  var arr = [];
  // For loop goes through and pushes "?" for every value it is given
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  // Array turned into a string to be used later
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  // Array variable declared
  var arr = [];
  // Loops through separating Keys from values, and returning strings with keys matching their values with " = " between them and " , " between pairs
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
};

// Object for all our SQL statement functions.
const orm = {
  // All selects all data from a table
  all: function (tableInput, cb) {
    // Query variable
    var queryString = "SELECT * FROM " + tableInput + ";";
    // Actual Query
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // Creates new data to be sent and stored in desired table
  create: function (table, cols, vals, cb) {
    // Query variable
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    // Actual query
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // Updates value/values in table
  update: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    // Calls for function to take values and return them in a string to be used for query
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    // Actual Query
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};
// Export the orm object
module.exports = orm;
