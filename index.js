const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");


const articleSchema = new mongoose.Schema({
    name:String,
    content:String,
});

const Article = new mongoose.model("Article", articleSchema);

app.listen(3000, function(req,res){
    console.log("The server was started at 3000");
});

app.route("/articles")
.get(function(req,res){
    Article.find({}, function(err, foundArticles){
        if(!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})
.post(function(req,res){
    const postedName = req.body.name;
    const postedContent = req.body.content;

    postedArticle = new Article ({
        name: postedName,
        content: postedContent,
    });

    postedArticle.save();
})
.delete(function(req,res){
    Article.deleteMany({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("There was no error!");
        }
    })
})

app.route("/articles/:content")
.get(function(req,res){
    Article.findOne({name:req.params.content}, function(err, foundArticle){
        if(foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("There exists no such data in our database!");
        }
    })
})
.put(function(req,res){
    Article.updateOne({name:req.params.content},{name:req.body.name, content:req.body.content}, function(err, results){
        if(!err) {
            res.send("Succesfully updated the database!");
        } else {
            res.send(err);
        }
    })
})
.patch(function(req,res){
    Article.updateOne({name:req.params.content},{name:req.body.name}, function(err, results) {
        if(!err) {
            res.send("Succesfully updated the database!");
        } else {
            res.send(err);
        }
    })
})
.delete(function(req,res){
    Article.deleteOne({name:req.params.content}, function(err, results){
        if(!err) {
            res.send("It has been deleted!");
        } else {
            res.send("It has been deleted!");
        }
    })
})