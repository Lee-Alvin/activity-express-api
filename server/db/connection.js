const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DATABASE_NAME = process.env.DATABASE_NAME || "activity";
const DATABASE_HOST = process.env.DATABASE_HOST || "mongodb-bored-api-express";
const DATABASE_PORT = process.env.DATABASE_PORT || "27017";

module.exports = {
	connectToDatabase: async function () {
		try {
			const con = await mongoose.connect(
				`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				}
			);
			console.log(
				"Successfully connected to database: " +
					DATABASE_NAME +
					" " +
					con.connection.host
			);
		} catch (err) {
			console.log(err);
			console.log("Failed to connect to database");
		}
	},
};
