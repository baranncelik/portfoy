const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utility/database");

const Projects = sequelize.define("projects", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  project_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  project_description: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
    link: {
    type: DataTypes.STRING,
    allowNull: true,
  },

    repo_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: false
});

module.exports = Projects;
