const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			isAlphanumeric:true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique:true,
			isEmail:true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set(value) {
				
				let cipher = crypto.createCipher("aes192", "i am strong password");
				let encrypted = cipher.update(value, "utf8", "hex");
				encrypted += cipher.final("hex");
				this.setDataValue("password", encrypted);
			},
			get(value) {
				let decipher = crypto.createDecipher("aes192", "i am strong password");
				let decrypted = decipher.update(this.getDataValue(value), "hex", "utf8");
				decrypted += decipher.final("utf8");
				return decrypted;
			},
		},
	});
	return user;
};
