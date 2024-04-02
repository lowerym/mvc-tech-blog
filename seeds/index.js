const sequelize = require('../config/connect');
const {User, Blog, Comment} = require('../models');

const users = [
  {
  "username":"sai12345",
  "password": "password12345"
  },
  {
  "username": "Lernantino",
  "password": "password12345"
  },
  {
  "username": "Amiko",
  "password": "password12345"
  }
]

const blogs = [
  {
  "title":"Why MVC is so important",
  "content": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
  "userID":"1"
  },
  {
  "title": "Authentication vs. Authorization",
  "content": "There is no difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.",
  "userID":"1"
  }
]

const comments = [
  {
    "body":"I learned about this in class!",
    "blogID":"1",
    "userID":"1"
  },
  {
    "body":"Very informative",
    "blogID":"2",
    "userID":"1"
  }
]

const plantSeeds = async () => {
  try {
    await sequelize.sync({ focus:true })
    await User.bulkCreate(users,{
      individualHooks:true
    });
    await Blog.bulkCreate(blogs);
    await Comment.bulkCreate(comments);
    process.exit(0);
  } catch(err) {
    console.log(err);
  }
}

plantSeeds();
