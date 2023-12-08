// const Polls = require("./Polls");
// const Questions = require("./Questions");
// const Users = require("./Users");

// const { Polls, Questions, Users } = require("../models/index");

module.exports = (sequelize, DataTypes) => {
	const Votes = sequelize.define("Votes", {
		selected_option: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	// Votes.belongsTo(Polls);
	// Votes.belongsTo(Questions);
	// Votes.belongsTo(Users);
	// // Votes.associate = (models) => {};
	// // Define associations if any
	return Votes;
};
// userId: {
// 	type: DataTypes.INTEGER,
// 	references: {
// 		model: "users",
// 		key: "id",
// 	},
// },
// pollId: {
// 	type: DataTypes.INTEGER,
// 	references: {
// 		model: "polls",
// 		key: "id",
// 	},
// },
// questionId: {
// 	type: DataTypes.INTEGER,
// 	references: {
// 		model: "Questions",
// 		key: "id",
// 	},
// },
// optionId: {
// 	type: DataTypes.INTEGER,
// 	references: {
// 		model: "Options",
// 		key: "id",
// 	},
// },
