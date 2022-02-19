const { validatePictureFile } = require("..");

test("picture is .png", () => {
	const picture = "picture.png";
	const valid = validatePictureFile(picture);
	expect(valid).toBe(true);
});

test("picture is .jpg", () => {
	const picture = "picture.jpg";
	const valid = validatePictureFile(picture);
	expect(valid).toBe(true);
});

test("picture is not .png or .jpg", () => {
	const picture = "picture.gif";
	const valid = validatePictureFile(picture);
	expect(valid).toBe(false);
});
