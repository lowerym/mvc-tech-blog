const path = require('path');

const express = require('express');

const expressHandleBars = require('express-handlebars');
const handlebars = expressHandleBars.create();

const routes = require('./controllers');

const sequelize = require('./config/connect.js');

const app = express();

const PORT = 3002;

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
});
