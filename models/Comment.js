const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connect');

class Comment extends Model {}

Comment.init ({
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment',
});

module.exports = Comment;
