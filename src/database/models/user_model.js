const mongoose = require("mongoose");
const userSchema = require("./../schemas/user_schema");
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
