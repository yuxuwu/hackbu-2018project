var mongoose = require("mongoose");
//Schema Setup
var project_schema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    author: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String
    },
    amount_required: Number, //cents
    amount_pledged: Number, //cents
    community: {type: mongoose.Schema.Types.ObjectId, ref: "Group"},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    views: Number
});
var Project = mongoose.model("Project", project_schema);
module.exports = Project;
