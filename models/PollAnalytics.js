module.exports = (sequelize, DataTypes) => {
	const PollAnalytics = sequelize.define("PollAnalytics", {
		total_votes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		option_counts: {
			type: DataTypes.JSON,
			allowNull: true,
		},
	});

	return PollAnalytics;
};
