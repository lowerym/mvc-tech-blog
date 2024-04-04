const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../models');
const withAuth = require('../../util/auth.js');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if(!blogData) {
      res.status(404).json({ message: 'No blog post has been found with this ID!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post has been found with this ID!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
