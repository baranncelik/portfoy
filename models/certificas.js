const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utility/database");

const Certificas = sequelize.define("certificas",{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    title : DataTypes.STRING,
    description : DataTypes.TEXT("long"),
    pdf : DataTypes.STRING,
},{ timestamps : false});

module.exports = Certificas;