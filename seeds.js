var mongoose = require("mongoose"),
    faker = require("faker");

var Project = require("./models/project"),
    Group = require("./models/group"),
    Comment = require("./models/comment"),
    User = require("./models/user");

var project_data = [],
    comment_data = [],
    group_data = {},
    user_data = {};

user_data = {
    username: "astrongman",
    password: "123",
    first_name: "Alex",
    last_name: "Steele",
    bio: faker.lorem.sentences(),
    profile_image: "https://static.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    community: "CoRE"
};

group_data = {
    name: faker.hacker.abbreviation(),
    image: faker.image.imageUrl()
}

project_data[0] = {
    title: "Broken Oven in O'Connor",
    thumbnail: "https://image.shutterstock.com/z/stock-photo-broken-chicken-barbecue-in-the-oven-662047357.jpg",
    description: "Someone has burnt the oven in the first floor kitchen...",
    amount_required: 50,
    amount_pledged: 0,
    community: "O'Connor"
}

project_data[1] = {
    title: "VR Headset for CoRE",
    thumbnail: "https://images-na.ssl-images-amazon.com/images/I/61vilOmXMCL._SX522_.jpg",
    description: "We need a VR headset in order to allow students the opputunity to work on VR developement in their free time.",
    amount_required: 500,
    amount_pledged: 15,
    community: "CoRE"
}

project_data[2] = {
    title: "Smash tourney prize money",
    thumbnail: "https://sites.psu.edu/dstiffler/files/2016/10/Smash-2b5k9kz.png",
    description: "Let's hold a Melee tournament! Must pledge at least $5 to enter.",
    amount_required: 50,
    amount_pledged: 45,
    community: "Binghamton FGC"
}

for(let i = 0; i < 3; i++){
    comment_data.push({
        text: faker.lorem.sentences(),
        author: faker.internet.userName(),
        likes: faker.random.number(50)
    });
}

function seedDB(){
    Group.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Groups removed");
            //Add group
            Group.create(group_data, function(err, group){
                if(err){
                    console.log(err);
                } else {
                    console.log("Created group");
                    User.remove({}, function(err){
                        if(err){
                            console.log(err);
                        } else{

                    User.create(user_data, function(err, user){
                        if(err){
                            console.log(err);
                        } else {
                            group.users.push(user);
                            Project.remove({}, function(err){
                                if(err){
                                    console.log(err);
                                } else {
                                    console.log("removed projects");
                                    //Add projects
                                    project_data.forEach(function(project){
                                        Project.create(project, function(err, project){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                console.log("Created a project");
                                                Comment.remove({}, function(err){
                                                    if(err){
                                                        console.log(err);
                                                    } else {
                                                        console.log("removed comments");
                                                        //Add a few comments
                                                        comment_data.forEach(function(comment){
                                                            Comment.create(comment, function(err, comment){
                                                                if(err){
                                                                    console.log(err);
                                                                } else {
                                                                    console.log(">>Created a comment");
                                                                    project.comments.push(comment);
                                                                        project.save();
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        }
                    });
                        }
                    });
                }
            });
        }
    });
}

module.exports = seedDB;
