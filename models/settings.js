const sequelize = require("../utility/database");
const {Sequelize, DataTypes} = require("sequelize");

const Settings = sequelize.define("settings",{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    about : DataTypes.TEXT("long"),
    ability : DataTypes.TEXT("long"),
    profile_photo : DataTypes.STRING,
    age : DataTypes.INTEGER,
    address : DataTypes.STRING,
    cv : DataTypes.STRING,
    mail : DataTypes.STRING,
    tel : DataTypes.STRING,



},{timestamps : false});

module.exports = Settings;