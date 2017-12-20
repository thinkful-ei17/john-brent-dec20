'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const itemRouter = require('./routers/item.router');
const uuid = require('uuid');
const {BlogPosts} = require('./models');
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

app.use(express.static('public'));




BlogPosts.create('day1', 'content', 'john', 'publishDate');
BlogPosts.create('day2', 'foo', 'brent', '111');
BlogPosts.create('day3', 'bar', 'author', '222');


// Your app should support the four CRUD operations for a blog posts resource.
// GET and POST requests should go to / blog - posts.
// DELETE and PUT requests should go to / blog - posts /: id.
// Use Express router and modularize routes to / blog - posts.
// Add a couple of blog posts on server load so you'll automatically have some data to look at when the server starts.

app.get('/blog-posts',( req, res)=>{
  // console.log(BlogPosts);
  res.json(BlogPosts.get()); 
});

app.post('/blog-posts', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate );
  res.status(201).json(item);
});




app.delete('/blog-posts/:id', (req, res) => {

});

app.put('/blog-posts/:id',jsonParser, (req, res) => {

});


app.listen(8080, () => {
  console.log(`Your app is listening on port ${8080}`);
});