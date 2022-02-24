const UsersValidator = require("../UsersValidator");

test("if username is not alphanumeric", () => {
	const badUsername = {
		username: "%",
		email: "bob@bob.com",
		password: "bob",
	};
	const test = () => {
		UsersValidator.validateInput(badUsername);
	};
	expect(test).toThrow(new Error("Username must be alphanumeric"));
});

test("non-valid email", () => {
	const badEmail = {
		username: "bob",
		email: "bobbob",
		password: "bob",
	};
	const test = () => {
		UsersValidator.validateInput(badEmail);
	};
	expect(test).toThrow(new Error("email is not on correct format"));
});

test("password is too short", () => {
	const badPassword = {
		username: "bob",
		email: "bob@bob.com",
		password: "",
	};
	const test = () => {
		UsersValidator.validateInput(badPassword);
	};
	expect(test).toThrow(new Error("password is too short"));
});

test("password is undefined", () => {
	const badPassword = {
		username: "bob",
		email: "bob@bob.com",
		password: undefined,
	};
	const test = () => {
		UsersValidator.validateInput(badPassword);
	};
	expect(test).toThrow(new Error("password is too short"));
});
