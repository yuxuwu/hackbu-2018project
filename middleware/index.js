var Project = require("../models/project");

var middlewareObj = {};

/* TODO: finish this
middlewareObj.checkProjectOwnership = function(req, res next){
    if(req.isAuthenticated(){
    }
});
*/

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = middlewareObj;
