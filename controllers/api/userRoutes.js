const router = require('express').Router();
const { User } = require('../../models');

// Sign Up
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userID = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!userData) {
      console.log('No user has been found!');
      res.status(400).json({ message: 'You have entered an incorrect email and/or password. Please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('That password does not match!');
      res.status(400).json({ message: 'You have entered an incorrect email and/or password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.userID = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You have logged in successfully!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(400).end();
  }
});

module.exports = router;
