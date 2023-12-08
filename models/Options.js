module.exports = (sequelize, DataTypes) => {
	const Options = sequelize.define("Options", {
		text: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return Options;
};
// questionId: {
// 	type: DataTypes.INTEGER,
// 	references: {
// 		model: "Questions", // Correct model name
// 		key: "id",
// 	},
// },
