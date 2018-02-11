var mongoose = require("mongoose");

//Schema setup
var comment_schema = new mongoose.Schema({
    text: String,
    author: String,
    likes: Number
});
module.exports = mongoose.model("Comment", comment_schema);
