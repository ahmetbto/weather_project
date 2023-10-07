const { DataTypes } = require("sequelize");
const sequelize = require("../data/database")




const Users = sequelize.define("users", {

	id: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: "Lütfen geçerli bir email adresi giriniz2",
			}
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,

	},
	role: {
		type: DataTypes.STRING,


	}
});

(async () => {
	await sequelize.sync();
	// Code here
})();

module.exports = Users
