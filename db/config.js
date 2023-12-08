const Sequelize = require("sequelize");
require("dotenv").config();
const seq = new Sequelize("poll_app_db", "root", process.env.DB_PASS, {
	host: "localhost",
	dialect: "mysql",
});

module.exports = { seq };
