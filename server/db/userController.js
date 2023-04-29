const User = require("../models/user");

module.exports = {
	insertUser: async (incomingUser) => {
		//create new User from incoming request and uses mongodb schema. saves into db
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
