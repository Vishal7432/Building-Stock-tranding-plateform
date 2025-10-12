require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const OrdersModel = require("./models/OrdersModel"); // ✅ direct import
const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
// const { OrdersModel } = require("./models/OrdersModel");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    console.log("Incoming order:", req.body);
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.status(201).send("Order saved!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving order");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
