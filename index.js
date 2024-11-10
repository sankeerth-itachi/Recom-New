const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const customer = require("./models/customerModel");
const app = express();
app.use(express.json);
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/customer");

app.post("/register", async (req, res) => {
  try {
    // Validate request body (example validation)
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const customerData = await customer.create(req.body);
    res.status(201).json(customerData);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "An error occurred while creating the customer." });
  }

  console.log(req.body);
});

app.listen(3001, () => {
  console.log("running");
});
