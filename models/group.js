var mongoose = require("mongoose");
//Schema Setup
var group_schema = new mongoose.Schema({
    name: String,
    users: [{type: ObjectId, ref: "User" }]
});
module.exports = mongoose.model("Group", group_schema);
