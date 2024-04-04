const router = require('express').Router();
const {User, Blog, Comment} = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['body'],
        },
      ],
    });

    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('home', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: trye });
    console.log(blog);

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    res.redirect('/login');
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userID, {
      attributes: { exclude: ['password'] },
      // Join user blog post and comment data with user data
      include: [
        {
          model: Blog,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('/dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('create', {
        logged_in: req.session.logged_in,
        userID: req.session.userID,
      });
      return;
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      // Join user data and comment data with blog post data
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log(blog);

    if (req.session.logged_in) {
      res.render('edit', {
        ...blog,
        logged_in: req.session.logged_in,
        userID: req.session.userID,
      });
      return;
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.all('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.all('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
