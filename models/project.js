var mongoose = require("mongoose");
//Schema Setup
var project_schema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    author: {
        id: {type: ObjectId, ref: "User"},
        username: String
    },
    amount_required: Number,
    amount_pledged: Number,
    location: String,
    comments: [{type: ObjectId, ref: "Comment"}]
});
var Project = mongoose.model("Project", project_schema);
module.exports = Project;
