const express = require('express');
const router = express.Router();
const {User, Blog, Comment} = require('../../models');
const bcrypt = require('bcrypt');

// Get all users and posts/comments associated with them
router.get('/', (req, res) => {
  User.findAll({include:[Blog, Comment]})
  .then(dbUsers => {
    res.json(dbUsers);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Logout
router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
})

// Get one user with their associated post & comment
router.get('/:id', (req, res) => {
  User.findByPk(req.params.id,{include:[Blog, Comment]})
  .then(dbUser => {
    res.json(dbUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Sign Up
router.post('/', (req, res) => {
  User.create(req.body, {individualHooks: true})
  .then(newUser => {
    req.session.user = {
      id: newUser.id,
      username: newUser.username
    }
    res.json(newUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(foundUser => {
    if (!foundUser) {
      return res.status(400).json({ msg: "Invald login credentials." })
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      }
      return res.json(foundUser)
    } else {
      return res.status(400).json({ msg: "Invalid login credentials." })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Update a user
router.put('/:id', (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    },
    individualHooks: true
  })
  .then(updatedUser => {
    res.json(updatedUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleteUser => {
    res.json(deleteUser);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "An error has occured.", err });
  });
});

module.exports = router;
