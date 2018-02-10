var router = require("express").Router();
var middlware = require("../middlware");

var Project = require("../models/project");

//INDEX -- show all projects
router.get("/", function(req, res){
    //Render all projects from db
    Project.find({}, function(err, allCampground){
        if(err){
            console.log(err);
        }else{
            res.send("Hi");
        }
    });
});

//CREATE -- add a new project to db
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form
    var title = req.body.title;
    var thumbnail = req.body.thumbnail;
    var description = req.body.description;
    var amount_required = req.body.amount_required;
    var amount_saved = 0;

    // create new project
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {title: title, thumbnail: thumbnail, description: description, var amount_required: amount_saved, amount_saved: amount_saved};

    //create new project
});
