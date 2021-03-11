module.exports = (sequelize, Sequelize) => {
	const actor = sequelize.define("actor", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: Sequelize.STRING(30),
	});
	return actor;
};
