const Sequelize = require("sequelize");

const db = new Sequelize('postgres://weatheruser:weatherpassword@localhost:5436/weather')

async function databaseConnect() {
	try {
		await db.authenticate();
		console.log("Databasesss is connected")
	} catch (err) {
		console.log("Database Error", err)
	}


}

databaseConnect()
module.exports = db

