const axios = require("axios");
const thresholds = require("./thresholds.js");

const callAPI = async (url, params = {}) => {
	try {
		let start = new Date();
		let response = await axios.get(url, params);
		console.log(`Response time for ${url} in ms:`, new Date() - start);
		return response.data;
	} catch (err) {
		throw err;
	}
};
const mapAccessiblity = (accessibility) => {
	if (accessibility <= thresholds.ACCESSIBILITY.High) {
		return "High";
	} else if (accessibility > thresholds.ACCESSIBILITY.Low) {
		return "Low";
	} else {
		return "Medium";
	}
};
const mapPrice = (price) => {
	if (price == 0) {
		return "Free";
	} else if (price > thresholds.PRICES.High) {
		return "High";
	} else {
		return "Low";
	}
};
const queryBuilder = (user) => {
	let query = "?";
	if (user.price === "High") {
		query += `minprice=${thresholds.PRICES.High + 0.01}&`;
	} else if (user.price === "Low") {
		query += `minprice=${thresholds.PRICES.Free}&maxprice=${thresholds.PRICES.High}&`;
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

	if (!response.error) {
		response.accessibility = mapAccessiblity(response.accessibility);
		response.price = mapPrice(response.price);
	}

	return response;
};

module.exports = { buildAndCall, queryBuilder };
