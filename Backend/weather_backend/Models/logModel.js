const { DataTypes } = require("sequelize");
const sequelize = require("../data/database")




const Logs = sequelize.define("logs", {
	id: {
		type: DataTypes.STRING,
		primaryKey: true

	},

	user_id: {
		type: DataTypes.STRING,
	},
	location_id: {
		type: DataTypes.STRING,
	},

	ip_adress: {
		type: DataTypes.TEXT,
	},

	result: {
		type: DataTypes.STRING,
	},
	result_time: {
		type: DataTypes.STRING,
	},
	result_state: {
		type: DataTypes.STRING,
	},
});

//(async () => {
//	await sequelize.sync();
//	// Code here
//})();

module.exports = Logs
