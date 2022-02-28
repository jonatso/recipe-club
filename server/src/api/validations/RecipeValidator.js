const isValidPath = require("is-valid-path");
const { validateParseInt, validatePictureFile } = require("../helpers");

const validateInput = (body) => {
   for (let i = 0; i < body.ingredients.length; i++) {
      if (!body.ingredients[i].name || body.ingredients[i].name === "") {
         throw new Error(`name is missing from ingredient ${i + 1}`);
      }
      if (!body.ingredients[i].quantity || body.ingredients[i].quantity === 0) {
         throw new Error(`quantity is missing from ingredient ${i + 1}`);
      }
      if (!validateParseInt(body.ingredients[i].quantity)) {
         throw new Error(`quantity in ingredient ${i + 1} is not an integer`);
      }
      if (!body.ingredients[i].unit || body.ingredients[i].unit === "") {
         throw new Error(`unit is missing from ingredient ${i + 1}`);
      }
   }
   // There should be some more validation (perhaps in the frontend?) to check if the file actually exists
   // In the first sprint the picture will be a url
   /* if (!isValidPath(body.picture)) {
		throw new Error("picture path is not a valid path");
	}
	if (!validatePictureFile(body.picture)) {
		throw new Error("picture is must be either .jpg or .png");
	} */

   if (!validateParseInt(body.difficulty)) {
      throw new Error("difficulty is not an integer");
   }
   // We could add more validation of the types, but it should not be necessary as they convert nicely into strings regardless, but it might not make sense if the user can input numbers as units or similar. This will largely depend on frontend implementation..
};

module.exports = {
   validateInput,
};
