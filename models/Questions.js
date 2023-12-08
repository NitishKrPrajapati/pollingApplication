module.exports = (sequelize, DataTypes) => {
	const Questions = sequelize.define("Questions", {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM("single", "multiple"),
			allowNull: false,
		},
	});

	return Questions;
};
// pollId: {
// 	type: DataTypes.INTEGER,
// 	references: {
// 		model: "Polls",
// 		key: "id",
// 	},
// },
