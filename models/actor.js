module.exports = (sequelize, DataTypes) => {
	const actor = sequelize.define("actor", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
	});
	return actor;
};
