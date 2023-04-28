const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const EXPRESS_API_PORT = process.env.EXPRESS_API_PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));

const databaseConnection = require("./db/connection.js");

app.listen(EXPRESS_API_PORT, () => {
	databaseConnection.connectToDatabase();
	console.log(`Server is running on port: ${EXPRESS_API_PORT}`);
});
