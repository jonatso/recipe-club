const RecipeValidator = require("../RecipeValidator");

test("ingredient without name", () => {
   const nameTest = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "", quantity: 1, unit: "s" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "picture.png",
      difficulty: 0,
   };
   const test = () => {
      RecipeValidator.validateInput(nameTest);
   };
   expect(test).toThrow(new Error(`name is missing from ingredient ${0 + 1}`));
});

test("ingredient without quantity", () => {
   const quantTest1 = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "s", quantity: 0, unit: "s" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "picture.png",
      difficulty: 0,
   };
   const test = () => {
      RecipeValidator.validateInput(quantTest1);
   };
   expect(test).toThrow(new Error(`quantity is missing from ingredient ${0 + 1}`));
});

test("quantity not an integer", () => {
   const quantTest2 = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "s", quantity: "blah", unit: "s" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "picture.png",
      difficulty: 0,
   };
   const test = () => {
      RecipeValidator.validateInput(quantTest2);
   };
   expect(test).toThrowError(new Error(`quantity in ingredient ${0 + 1} is not an integer`));
});

test("ingredient without unit", () => {
   const unitTest = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "s", quantity: 1, unit: "" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "picture.png",
      difficulty: 0,
   };
   const test = () => {
      RecipeValidator.validateInput(unitTest);
   };
   expect(test).toThrowError(new Error(`unit is missing from ingredient ${0 + 1}`));
});

test("picture path is invalid", () => {
   const pictureTest1 = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "s", quantity: 1, unit: "s" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "!&../&/¤(./)#¤H.J..png",
      difficulty: 0,
   };
   const test = () => {
      RecipeValidator.validateInput(pictureTest1);
   };
   expect(test).toThrowError(new Error("picture path is not a valid path"));
});

test("picture file is invalid", () => {
   const pictureTest2 = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "s", quantity: 1, unit: "s" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "picture.gif",
      difficulty: 0,
   };
   const test = () => {
      RecipeValidator.validateInput(pictureTest2);
   };
   expect(test).toThrowError(new Error("picture is must be either .jpg or .png"));
});

test("difficulty is not an integer", () => {
   const diffTest = {
      name: "s",
      description: "s",
      ingredients: [
         { name: "s", quantity: 1, unit: "s" },
         { name: "s", quantity: 1, unit: "s" },
      ],
      method: "s",
      picture: "picture.png",
      difficulty: "bleh",
   };
   const test = () => {
      RecipeValidator.validateInput(diffTest);
   };
   expect(test).toThrowError(new Error("difficulty is not an integer"));
});
