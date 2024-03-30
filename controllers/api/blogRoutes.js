const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../models');
const withAuth = require('../../util/auth.js');

// Get all blogs and users/comments associated with them
router.get('/', (req, res) => {
  Blog.findAll({include:[User, Comment]})
  .then(dbBlogs => {
    res.json(dbBlogs);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Get one blog with their associated user & comment
router.get('/:id', (req, res) => {
  Blog.findByPk(req.params.id,{include:[User, Comment]})
  .then(dbBlog => {
    res.json(dbBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Create a new blog post
router.post('/', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ msg: "Please Login!" })
  }
  Blog.create({
    title: req.body.title,
    content: req.body.content,
    userID: req.session.user.id
  })
  .then(newBlog => {
    res.json(newBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Update a blog post
router.put('/:id', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ msg: "Please Login!" })
  }
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedBlog => {
    res.json(updatedBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Delete a blog post
router.delete('/:id', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ msg: "Please Login!" })
  }
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleteBlog => {
    res.json(deleteBlog);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

module.exports = router;
