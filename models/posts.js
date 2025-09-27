const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utility/database");

const Posts = sequelize.define("posts",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary : {
    type: DataTypes.TEXT("long"),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  
  }, {
  tableName: 'posts',
  timestamps: true
  });



module.exports = Posts;