const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let app = express();
app.use(logger("dev"));
app.use(bodyParser.json());

// start connection
mongoose.connect(
  "mongodb://localhost/test",
  { useNewUrlParser: true, useFindAndModify: false }
);

// define schema
const accountSchema = mongoose.Schema({
  name: String,
  balance: Number
});

// define model
let Account = mongoose.model("Account", accountSchema);

// GET all accounts
app.get("/accounts", (req, res) => {
  let result = Account.find({}, function(error, accounts) {
    if (error) console.log(error);
    else {
      let accountsMap = {};
      // add each account to map object
      accounts.forEach(function(acc) {
        accountsMap[acc._id] = acc;
      });
      console.log("Sending all accounts");
      res.send(accountsMap);
    }
  });
});

// POST new account
app.post("/accounts", (req, res) => {
  let newAccount = new Account(req.body);
  newAccount.save((error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Saved: ", results);
      res.end();
    }
  });
});

// UPDATE specific ID
app.put("/accounts/:id", (req, res) => {
  let update = req.body;
  let query = { _id: req.params.id };

  Account.findOneAndUpdate(query, update, { new: true }, function(
    error,
    result
  ) {
    if (error) console.log(error);
    else {
      console.log("Sending: ", result);
      res.send(result);
    }
  });
});

// DELETE specific ID
app.delete("/accounts/:id", (req, res) => {
  let query = { _id: req.params.id };
  Account.findByIdAndRemove(query, function(error, result) {
    if (error) console.log(error);
    else {
      console.log("Deleting: ", result);
      res.send(result);
    }
  });
});

// start server - listening on port 3000
app.listen(3000);
