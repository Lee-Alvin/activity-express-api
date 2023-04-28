const User = require("../models/user");

module.exports = {
	insertUser: async (incomingUser) => {
		let newUser = new User({
			name: incomingUser.name,
			price: incomingUser.price,
			accessibility: incomingUser.accessibility,
		});

		newUser
			.save()
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.error(error);
			});
	},
};
