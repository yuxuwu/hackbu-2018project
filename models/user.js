var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var user_schema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String},
    first_name: {type: String, required: true},
    last_name:{type: String, required: true},
    bio: String,
    profile_image: String,
    community: String,
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"}],
    projects_created: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
    projects_pledged: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
});
user_schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", user_schema);
