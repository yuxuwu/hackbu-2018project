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

//TODO:Requiring routes
/*
var projectRoutes = require(),
    userRoutes = require(),
*/
var indexRoutes = require("./routes/index");

//Middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
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

//TODO:Routes
app.use("/", indexRoutes);
//app.use("/projects", projectRoutes);

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Started on PORT " + port);
});
