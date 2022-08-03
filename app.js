//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Go ahead and live with your head held high! No matter how devastated you may be by your own weakness or uselessness…set your heart ablaze. Grit your teeth and look straight ahead.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/",function(req,res){
  res.render("home",{content0:homeStartingContent,postItem:posts});
});

app.get("/about", function(req,res){
  res.render("about",{content0:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact",{content0:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.get("/posts/:topic",function(req,res){
  posts.forEach(function(element){
    if(_.lowerCase(req.params.topic)==_.lowerCase(element.title)){
      res.render("post",{contentHeading:element.title,contentBody:element.body});
    }
  });

});

app.post("/compose",function(req,res){
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody,
  }

  posts.push(post);

  res.redirect("/");
  
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
