const { DataTypes } = require('sequelize');

const BlogModel = (sequelize) => {
  return sequelize.define('blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscribeList: {
      type: DataTypes.JSON,
      allowNUll: true,
      defaultValue: [],
    },
    subscribeCount: {
      type: DataTypes.INTEGER,
      allowNUll: true,
      defaultValue: 0,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNUll: false,
    },
    blogInfo: {
      type: DataTypes.STRING,
      allowNUll: true,
    },
    writerImg: {
      type: DataTypes.STRING,
      allowNUll: true,
    },
    fontColor: {
      type: DataTypes.STRING,
    },
    bgColor: {
      type: DataTypes.STRING,
    },
    theme: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
};
module.exports = BlogModel;
