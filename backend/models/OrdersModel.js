const { model } = require("mongoose");
const { OrderSchema, OrderSchema } = require("../schemas/OrdersSchema");

const { OrderSchema } = model("Order", OrderSchema);

module.exports = { OrderSchema };
