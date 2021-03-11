module.exports = (sequelize, DataTypes) => {
	const actor = sequelize.define("actor", {
		name: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
	});
	return actor;
};
