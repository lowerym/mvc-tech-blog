const express = require('express');
const expressHandleBars = require('express-handlebars');
const routes = require('./controllers');
const session = require('express-session');
const sequelize = require('./config/connect.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();
const PORT = 3002;

const { User, Blog, Comment } = require('./models');

app.use(express.urlencoded({
  extended: true
}));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.static('public'));

const hbs = expressHandleBars.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/', routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
});
