const { validateParseInt } = require("../validateParseInt");

test("string is not int", () => {
   const test = "blah";
   const valid = validateParseInt(test);
   expect(valid).toBe(false);
});

test("string is int", () => {
   const test = "1";
   const valid = validateParseInt(test);
   expect(valid).toBe(true);
});
