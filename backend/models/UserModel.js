const mongoose = require("mongoose");
const { model } = mongoose; //  yeh line missing thi!

const { userSchema } = require("../schemas/UsersSchema");

const userModel = model("Users", userSchema);

module.exports = model("Users", userSchema); // export directly
