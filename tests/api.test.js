const request = require("supertest");

const app = require("../server/app");

describe("GET /activity", () => {
	it("should get an activity and respond with 200", async () => {
		const response = await request(app).get("/activity");
		expect(response.statusCode).toBe(200);
	});
	it("should fail and respond with 404", async () => {
		const response = await request(app).get("/some/path/that/doesnt/exist");
		expect(response.statusCode).toBe(404);
	});
});

describe("POST /user", () => {
	it("should send a user and get an activity and respond with 200", async () => {
		const response = await request(app).post("/user").send({
			name: "Joe",
			price: "Free",
			accessibility: "High",
		});
		expect(response.statusCode).toBe(200);
	});
	it("should fail request validation with 422", async () => {
		const response = await request(app).post("/user").send({
			name: 123,
		});
		expect(response.statusCode).toBe(422);
	});
	it("should fail and respond with 404", async () => {
		const response = await request(app).post("/blahblahblah");
		expect(response.statusCode).toBe(404);
	});
});
