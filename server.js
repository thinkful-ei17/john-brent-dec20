'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRouter = require('./routers/item-router');
const uuid = require('uuid');
const {BlogPosts} = require('./models');
const app = express();

app.use(bodyParser.json());

app.use(morgan('common'));

app.use(express.static('public'));

app.use('/blog-posts',itemRouter);

BlogPosts.create('day1', 'content', 'john', 'publishDate');
BlogPosts.create('day2', 'foo', 'brent', '111');
BlogPosts.create('day3', 'bar', 'author', '222');


// Your app should support the four CRUD operations for a blog posts resource.
// GET and POST requests should go to / blog - posts.
// DELETE and PUT requests should go to / blog - posts /: id.
// Use Express router and modularize routes to / blog - posts.
// Add a couple of blog posts on server load so you'll automatically have some data to look at when the server starts.

app.listen(8080, () => {
  console.log(`Your app is listening on port ${8080}`);
});