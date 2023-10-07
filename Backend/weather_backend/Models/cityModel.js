const { DataTypes } = require("sequelize");
const sequelize = require("../data/database")




const City = sequelize.define("city", {
	cityName: {
		type: DataTypes.TEXT

	},

	id: {
		type: DataTypes.STRING,
		primaryKey: true

	}

});

//(async () => {
//	await sequelize.sync();
//	// Code here
//})();

module.exports = City
