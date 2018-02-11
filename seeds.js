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
    username: faker.internet.userName(),
    password: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    bio: faker.lorem.sentences(),
    profile_image: faker.image.imageUrl(),
    community: faker.address.city()
};

group_data = {
    name: faker.hacker.abbreviation(),
    image: faker.image.imageUrl()
}

for(let i = 0; i < 3; i++){
    project_data.push({
        title: faker.company.companyName(),
        thumbnail: faker.image.imageUrl(),
        description: faker.lorem.sentences(),
        amount_required: faker.random.number(10000),
        amount_pledged: faker.random.number(5000),
        views: 0
    });
}

for(let i = 0; i < 3; i++){
    comment_data.push({
        text: faker.lorem.sentences(),
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
                                                                }
                                                            });
                                                        });
                                                        project.save();
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

module.exports = seedDB;
