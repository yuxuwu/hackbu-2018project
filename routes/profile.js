var router = require("express").Router();
var middleware = require("../middleware");

var User = require("../models/user");

//SHOW -- show selected user profile
router.get("/:userID", function(req, res){
    var userID = req.params.userID;
    console.log(userID);
    console.log("wtf");
    User.findById(userID).populate("groups")
                         .populate("projects_created")
                         .populate("projects_pledged")
                         .exec(function(err, foundUser){
                            if(err){
                                console.log(err);
                            } else {
                                res.render("profiles/show", {user: foundUser});
                            }
                         });
});

//EDIT
router.get("/:userID/edit", function(req, res){
    var userID = req.params.userID;
    //console.log(userID);
    User.findById(userID).populate("groups").exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("profiles/edit", {user: foundUser});
        }
    });
});

//UPDATE
router.put("/:userID", function(req, res){
    //find and update user
    User.findByIdAndUpdate(req.params.userID, req.body.user, function(err, updatedCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/profiles/"+req.params.userID);
        }
    });
});

module.exports = router;
