module.exports = (sequelize, DataTypes) => {
	const Polls = sequelize.define("Polls", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		min_reward: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		max_reward: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	});

	return Polls;
};
