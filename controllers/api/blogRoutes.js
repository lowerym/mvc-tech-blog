const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth.js');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      userID: req.session.userID,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        userID: req.session.userID,
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
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        userID: req.session.userID,
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
