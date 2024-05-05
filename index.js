require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

// Setup Express JS
const app = express();

// Setup Connection Mongodb
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("success to connect mongoDB"))
  .catch((err) => console.log("Error connect mongoDB", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const routes = require("./routes");

// Use routes
app.use(express.static('public'));
app.use(`/api/${process.env.VERSION}/`, routes);

app.listen(process.env.PORT, () => {
  console.log(`server Started at http://localhost:${process.env.PORT}/`);
});
