var router = require("express").Router();
var passport = require("passport");

var User = require("../models/user");

//Routes
router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username, first_name: req.body.first_name, last_name: req.body.last_name}), req.body.password, function(err, user){
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});
router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/projects",
        failureRedirect: "/login"
    }), function(req, res){
});
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;
