const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Welcome to the blogs of TechBrew! Your go-to platform for everything tech-related. Explore a world of cutting-edge innovations, software updates, gadget reviews, and insightful tech analyses. Stay ahead in the fast-paced tech landscape with our in-depth articles on artificial intelligence, blockchain, cybersecurity, and more. From beginner-friendly tutorials to expert-level discussions, we've got something for tech enthusiasts of all levels. Engage with fellow techies, share your thoughts, and join the vibrant tech community in the comments section. So, whether you're a tech aficionado, developer, or simply curious about the latest tech trends, fasten your seatbelt and let's embark on an exciting tech journey together!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const posts = [];

app.get('/',function(req,res) {
  res.render('home', {homeContent: homeStartingContent, posts: posts});
})

app.get('/about',function(req,res) {
  res.render('about',{about: aboutContent});
})

app.get('/contact',function(req,res) {
  res.render('contact',{contact: contactContent});
})

app.get('/compose',function(req,res) {
  // console.log(req.body);
  res.render('compose')
})

app.get('/posts/:post',function(req,res) {
  // var post = _.lowerCase(req.params.post);  
  // var flag = 0;
  // for(var i=0;i<posts.length;i++) {
  //   if(post === _.lowerCase(posts[i].title)) {
  //     flag = 1;
  //     break;
  //   }
  // }
  // if(flag === 1)
  //   console.log("Match Found !");
  // else 
  //   console.log("Match not found !");
  // res.redirect('/');
  var post = _.lowerCase(req.params.post);
  for(var i=0;i<posts.length;i++) {
    if(post === _.lowerCase(posts[i].title)) {
      res.render('post', {postTitle: posts[i].title, postBody: posts[i].body});
    }
  }
  res.send("No matching result found");
})

app.post('/compose',function(req,res) {
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
