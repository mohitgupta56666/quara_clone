const exp = require("constants");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded( {entended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts =[
    {
    "id" : uuidv4(),
    "username" : "mohit",
    "comments" : "all is well."
},{
    "id" : uuidv4(),
    "username" : "anis",
    "comments" : "ginga la la"
},{
    "id" : uuidv4(),
    "username" : "krish",
    "comments" : "sab thik"
}
] 


app.get("/", (req, res) => {
    res.send("everything working well.");
})

app.get( "/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get ("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {username, comments}= req.body;
    let id = uuidv4();
    posts.push({id, username, comments});

    console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id);
    res.render("show.ejs", {post});
    console.log(post);
    
});

app.patch( "/posts/:id", (req, res) => {
    let {id} = req.params;
    let newComment = req.body.comments;
    let post = posts.find( (p) => id === p.id);
    post.comments = newComment;
    console.log(id , newComment);
    res.redirect("/posts");
});

app.get( "/posts/:id/update", (req, res) => {
    let {id} = req.params;
    let post = posts.find( (p) => id === p.id);
    res.render("update.ejs", {post});
});

app.delete( "/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter( (p) => id !== p.id);
    res.redirect("/posts");
})

app.listen( port, () => {
    console.log(`listening at port ${port}`);
});

/*
uuid package for unique id
npm i uuid

npm i method-override
*/