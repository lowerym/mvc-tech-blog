const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "userID",
});

Blog.hasMany(Comment, {
  foreignKey: "blogID",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  foreignKey: "blogID",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userID",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userID",
});

module.exports = {
  User,
  Blog,
  Comment
}
