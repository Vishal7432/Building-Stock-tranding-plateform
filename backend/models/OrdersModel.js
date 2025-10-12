const { model } = require("mongoose");
const OrderSchema = require("../schemas/OrdersSchema"); // import schema

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel; // direct export the model
// ✅ export model directly
