module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define("Users", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	// Users.associate = (models) => {
	// 	// Define associations if any
	// 	Users.hasMany(models.Votes, { foreignKey: "userId" });
	// };

	return Users;
};
