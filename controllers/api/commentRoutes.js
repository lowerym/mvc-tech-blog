const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../models');

// Get all comments and users/posts associated with them
router.get('/', (req, res) => {
  Comment.findAll({include:[User, Blog]})
  .then(dbComments => {
    res.json(dbComments);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Get one comment with their associated user & post
router.get('/:id', (req, res) => {
  Comment.findByPk(req.params.id,{include:[User, Blog]})
  .then(dbComments => {
    res.json(dbComments);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Create a new comment
router.post('/', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ msg: "Please Login!" })
  }
  Comment.create({
    body: req.body.body,
    userID: req.session.user.id,
    blogID: req.session.blogID
  })
  .then(newComment => {
    res.json(newComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Update a comment
router.put('/:id', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ msg: "Please Login!" })
  }
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedComment => {
    res.json(updatedComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({ msg: "Please Login!" })
  }
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleteComment => {
    res.json(deleteComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

module.exports = router;
