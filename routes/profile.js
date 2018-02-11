var router = require("express").Router();
var middleware = require("../middleware");

var User = require("../models/user");

//SHOW -- show selected user profile
router.get("/:userID", function(req, res){
    var userID = req.params.userID;
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

module.exports = router;
