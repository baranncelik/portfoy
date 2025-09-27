const Sequelize = require("sequelize");

const sequelize = new Sequelize("portfoy_db","root","BaranCelik!48650913",{
    dialect : "mysql",
    host : "localhost",
    timezone : "+03:00"
});

module.exports = sequelize;