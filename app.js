var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override");

var Project = require("./models/project"),
    User = require("./models/user");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/hackbu");
var seedDB = require("./seeds");
//seed database
seedDB();

//Requiring routes
var projectRoutes = require("./routes/projects"),
    indexRoutes = require("./routes/index"),
    profileRoutes = require("./routes/profile");

//Middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//Passport Config
app.use(require("express-session")({
    secret: "something",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Custom Middlware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes
app.use("/", indexRoutes);
app.use("/projects", projectRoutes);
app.use("/profiles", profileRoutes);

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Started on PORT " + port);
});
