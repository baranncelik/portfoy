/*const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utility/database");

const Like = sequelize.define("likes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true, 
  tableName: "likes",
});

module.exports = Like;
*/