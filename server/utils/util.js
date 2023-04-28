const axios = require("axios");
const thresholds = require("./thresholds.js");

//async call to API with axios
const callAPI = async (url, params = {}) => {
	try {
		let start = new Date();
		let response = await axios.get(url, params);
		console.log(`Response time for ${url} in ms:`, new Date() - start);
		return response.data;
	} catch (err) {
		let error = {
			message: "Failed to call API: " + err.message,
			code: err.code,
			status: err.status || 500,
		};
		console.log("Failed to call API", error);
		throw error;
	}
};

//determine string accessbility from decimal accessbility by comparing to thresholds
const mapAccessiblity = (accessibility) => {
	if (accessibility <= thresholds.ACCESSIBILITY.High) {
		return "High";
	} else if (accessibility > thresholds.ACCESSIBILITY.Low) {
		return "Low";
	} else {
		return "Medium";
	}
};

//determine string price from decimal price by comparing to thresholds
const mapPrice = (price) => {
	if (price == 0) {
		return "Free";
	} else if (price > thresholds.PRICES.High) {
		return "High";
	} else {
		return "Low";
	}
};

//determine decimal values of accessbility and price from given string and constructing query string to send request to API
const queryBuilder = (user) => {
	let query = "?";
	if (user.price === "High") {
		query += `minprice=${thresholds.PRICES.High + 0.01}&`;
	} else if (user.price === "Low") {
		query += `minprice=${thresholds.PRICES.Free + 0.01}&maxprice=${
			thresholds.PRICES.High
		}&`;
	} else {
		query += `price=${thresholds.PRICES.Free}&`;
	}

	if (user.accessibility === "High") {
		query += `maxaccessibility=${thresholds.ACCESSIBILITY.High}`;
	} else if (user.accessibility === "Low") {
		query += `minaccessibility=${thresholds.ACCESSIBILITY.Low + 0.01}`;
	} else {
		query += `minaccessibility=${
			thresholds.ACCESSIBILITY.High + 0.01
		}&maxaccessibility=${thresholds.ACCESSIBILITY.Low}`;
	}

	return query;
};

const buildAndCall = async (boredAPIHost, boredAPIPath, boredAPIQueries) => {
	let response = await callAPI(boredAPIHost + boredAPIPath + boredAPIQueries);

	//checks to see if there are any applicable activities. some combinations of price and accessbiility can return error with no activities
	if (!response.error) {
		response.accessibility = mapAccessiblity(response.accessibility);
		response.price = mapPrice(response.price);
	}

	return response;
};

module.exports = { buildAndCall, queryBuilder };
