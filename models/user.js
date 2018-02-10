var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var user_schema = mongoose.Schema({
    username: String,
    password: String,
    projects: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        title: String,
        thumbnail: String
    },
    location: String,
    interest_groups: {

    }
});
user_schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", user_schema);
