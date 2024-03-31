const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connect');

class Blog extends Model {}

Blog.init ({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'blog',
});

module.exports = Blog;
