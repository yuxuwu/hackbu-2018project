var mongoose = require("mongoose");
//Schema Setup
var project_schema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    amount_required: Number,
    amount_pledged: Number,
    location: String
});
var Project = mongoose.model("Project", project_schema);
module.exports = Project;
