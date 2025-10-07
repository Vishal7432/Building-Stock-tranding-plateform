const { model } = require("mongoose");

const { PositionSchema } = require("../schemas/PositionsSchema");

const PositionsModel = model("position", PositionSchema);

module.exports = { PositionsModel };
