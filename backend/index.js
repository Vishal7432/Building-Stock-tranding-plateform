const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const OrdersModel = require("./models/OrdersModel");
const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(express.json()); // only this is needed
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Incoming body:", req.body);
  next();
});

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body); //  will now show correct data

  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.status(201).send("Order saved!");
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).send("Error saving order");
  }
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
