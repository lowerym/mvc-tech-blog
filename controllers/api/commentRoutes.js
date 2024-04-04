const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../models');

// Get all comments and users/posts associated with them
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Blog,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/', async (req, res) => {
  try {
    console.log('We Got This!');
    const comment = await Comment.create({
      body: req.body.body,
      blogID: req.body.blogID,
      userID: req.session.userID || req.body.userID,
    });

    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a comment
router.put('/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedComment[0]) {
      res.status(400).json({ message: 'No comment has been found with that ID!' });
      return;
    }

    console.log('Your comment has been updated!');
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: 'No comment has been found with that ID!' });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
