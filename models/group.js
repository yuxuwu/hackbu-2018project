var mongoose = require("mongoose");
//Schema Setup
var group_schema = new mongoose.Schema({
    name: String,
    image: String,
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
module.exports = mongoose.model("Group", group_schema);
