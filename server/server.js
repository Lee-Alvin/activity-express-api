const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config();

const DATABASE_NAME = process.env.DATABASE_NAME || "activity";
const DATABASE_HOST = process.env.DATABASE_HOST || "mongodb-bored-api-express";
const DATABASE_PORT = process.env.DATABASE_PORT || "27017";
const EXPRESS_API_PORT = process.env.EXPRESS_API_PORT || 8080;

try {
	mongoose
		.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			app.listen(
				EXPRESS_API_PORT,
				console.log(
					`Server and connected to database. Listening on port ${EXPRESS_API_PORT}`
				)
			);
		});
} catch (err) {
	console.log(err);
	console.log("Failed to connect to database");
}
