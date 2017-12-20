'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');
const {BlogPosts} = require('../models');
const router = express.Router();



router.get('/', (req, res) => {
  // console.log(BlogPosts);
  res.json(BlogPosts.get());
});

router.post('/', (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});




router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted Blog-Post: ${req.params.id}`);
  res.status(204).end();
});

router.put('/:id', (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Blog-Posts: \`${req.params.id}\``);
  BlogPosts.update({
    title: req.body.title,
    id: req.params.id,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

module.exports = router;