module.exports = (sequelize, dataTypes) => {
	const director = sequelize.define("director", {
		id: {
			type: dataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		name: dataTypes.STRING,
	});
	return director;
};
