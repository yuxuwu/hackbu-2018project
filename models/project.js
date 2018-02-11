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
    community: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    location: {
        type: [Number], //[<Longitude>, <Latitude>]
        index: '2d'
    },
    views: Number
});
var Project = mongoose.model("Project", project_schema);
module.exports = Project;
