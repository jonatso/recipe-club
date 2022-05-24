const UsersValidator = require("../UsersValidator");

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
