'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Member = require('./member')(sequelize);
db.Chat = require('./chat')(sequelize);
db.Room = require('./room')(sequelize);
db.Blog = require('./blog')(sequelize);
db.Category = require('./category')(sequelize);
db.Comment = require('./comment')(sequelize);
db.Post = require('./post')(sequelize);

db.Member.hasOne(db.Blog);
db.Blog.belongsTo(db.Member);

db.Blog.hasMany(db.Category);
db.Category.belongsTo(db.Blog);

db.Blog.hasMany(db.Comment, { foreignKey: 'postId', as: 'comments' });
db.Comment.belongsTo(db.Blog, { foreignKey: 'postId', as: 'blog' });

db.Blog.hasMany(db.Post, { foreignKey: 'blogId', onDelete: 'CASCADE' });
db.Post.belongsTo(db.Blog, {
  foreignKey: 'blogId',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
