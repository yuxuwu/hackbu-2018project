var router = require("express").Router();
var passport = require("passport");

//TODO:
//var User = require();

//Routes
router.get("/", function(req, res){
    res.render("landing");
});

module.exports = router;
