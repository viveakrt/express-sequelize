module.exports = (sequelize, dataType) => {
    const genreDetails = sequelize.define('genre', {
        id: {
            type: dataType.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        type: dataType.STRING
    });
    return genreDetails;
}
