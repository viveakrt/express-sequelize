module.exports = (sequelize, dataType) => {
	const movieDetails = sequelize.define("movie", {
		id: {
			type: dataType.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		Rank: dataType.INTEGER,
		Title: dataType.STRING,
		Description: dataType.TEXT,
		Runtime: dataType.INTEGER,
		Rating: dataType.DECIMAL(3,1),
		Metascore: dataType.INTEGER,
		Votes: dataType.INTEGER,
		Gross_Earning_in_Mil: dataType.DECIMAL,
		Year: dataType.DATEONLY,
	});
	return movieDetails;
};
