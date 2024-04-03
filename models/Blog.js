const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connect');

class Blog extends Model {}

Blog.init ({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateCreated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'blog',
});

module.exports = Blog;
