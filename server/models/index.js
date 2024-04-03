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

db.Member.hasOne(db.Blog);
db.Blog.belongsTo(db.Member);

db.Blog.hasMany(db.Category);
db.Category.belongsTo(db.Blog);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
