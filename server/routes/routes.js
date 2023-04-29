const express = require("express");
const dotenv = require("dotenv");

const routes = express.Router();
const { check, validationResult } = require("express-validator");

const util = require("../utils/util.js");
const userController = require("../db/userController.js");
const thresholds = require("../utils/thresholds.js");

dotenv.config();

const BORED_API_HOST = process.env.BORED_API_HOST || "https://boredapi.com";
const BORED_API_PATH = process.env.BORED_API_PATH || "/api/activity";
let boredAPIQueries = "";

routes.get("/activity", async (req, res) => {
	try {
		let response = await util.buildAndCall(
			BORED_API_HOST,
			BORED_API_PATH,
			boredAPIQueries
		);

		res.status(200).json(response);
	} catch (err) {
		res.status(err.status).json(err);
	}
});

routes.post(
	"/user",
	[
		check("name").not().isEmpty().isAlpha(),
		check("price").isIn(thresholds.PRICES),
		check("accessibility").isIn(thresholds.ACCESSIBILITY),
	],
	async (req, res) => {
		try {
			//simple incoming request validation. returns 422 and errors if failed
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).jsonp(errors.array());
			}

			//saves current user to activity database and user collection
			userController.insertUser(req.body);

			//build query string to call API based on user's price and accessbility
			boredAPIQueries = util.queryBuilder(req.body);

			let response = await util.buildAndCall(
				BORED_API_HOST,
				BORED_API_PATH,
				boredAPIQueries
			);

			res.status(200).json(response);
		} catch (err) {
			res.status(err.status).json(err);
		}
	}
);

module.exports = routes;
