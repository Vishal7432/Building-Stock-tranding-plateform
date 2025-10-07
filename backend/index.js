require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const app = express();
mongoose.connect;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
  mongoose.connect(uri);
  console.log("MongoDB is connected");
});
