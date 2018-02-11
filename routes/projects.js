var router = require("express").Router();
var middleware = require("../middleware");
var geolocator = require("geolocator");

var Project = require("../models/project"),
    Group = require("../models/group");

//INDEX -- show all projects
router.get("/", function(req, res){
    //Render all projects from db
    Project.find({}, function(err, allProjects){
        if(err){
            console.log(err);
        }else{
            res.render("projects/index", {projects: allProjects, currentUser: req.user});
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("projects/new", {user: req.user});
});

//CREATE -- add a new project to db
router.post("/", middleware.isLoggedIn, function(req, res){
    var newProject = req.body.project;
    newProject.amount_saved = 0;
    newProject.views = 0;

    newProject.author = {
        id: req.user._id,
        username: req.user.username
    }

    //create new project
    Project.create(newProject, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/projects");
        }
    });
});

//SHOW -- place project in front
router.get("/:projectID/show", function(req, res){
    var projectID = req.params.projectID;
    Project.findById(projectID).populate("comments").exec(function(err, foundProject){
        res.render("projects/show", {project: foundProject});
    });
});

module.exports = router;
