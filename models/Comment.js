const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connect');

class Comment extends Model {}

Comment.init ({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  body: {
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
   blogID: {
    type: DataTypes.INTEGER,
    references: {
      model: "blog",
      key: "id",
    },
  },
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'comment',
});

module.exports = Comment;
