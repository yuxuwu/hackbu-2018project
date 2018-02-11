var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var user_schema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name:{type: String, required: true},
    bio: String,
    profile_image: String,
    location: String,
    groups: [{type: ObjectId, ref: "Group"}],
    projects_created: [{type: ObjectId, ref: "Project"}],
    projects_pledged: [{type: ObjectId, ref: "Project"}]
});
user_schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", user_schema);
