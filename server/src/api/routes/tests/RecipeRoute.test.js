const createServer = require("../../helpers/server");
const app = createServer();
const supertest = require("supertest");
const db = require("../../models");
const { Recipe } = require("../../models");

/* 
Based on our setup it is not necessary to test controllers, as they have the "same" tests, just using different input (that is inspired by these inputs). Validations and services are tested separately.
*/

const recipePayload = {
	name: "Pizza",
	description: "This is great",
	ingredients: [
		{ name: "cheese", quantity: 3, unit: "kg" },
		{ name: "meat", quantity: 300, unit: "g" },
	],
	method: "do that",
	picture: "blessedPizza.png",
	difficulty: 4,
};

const recipePayloadUpdate = {
	name: "PizzaUpdate",
	description: "This is great",
	ingredients: [
		{ name: "cheese", quantity: 3, unit: "kg" },
		{ name: "meat", quantity: 300, unit: "g" },
	],
	method: "do that",
	picture: "blessedPizza.png",
	difficulty: 4,
};

const badRecipePayload = {
	names: "Pizzas",
	memes: "This is great",
	dont: [
		{ name: "cheese", quantity: 3, unit: "kg" },
		{ name: "meat", quantity: 300, unit: "g" },
	],
	hello: "do that",
	woaw: "blessedPizza.png",
	difficulty: 4,
};

// START BLOCK
// VERY IMPORTANT FOR ASYNC TESTING

beforeEach(async () => {
	await db.sequelize.sync({ force: true });
});

afterAll(async (done) => {
	db.sequelize.close();
	done();
});

// END BLOCK

test("Given no recipes exist, getRecipes statusCode is 200 and sends an empty array", async () => {
	expect.assertions(2);
	const { statusCode, body } = await supertest(app).get(`/recipes/`);
	expect(statusCode).toBe(200);
	expect(body).toStrictEqual([]);
});

test("Given a recipe exists, getRecipes statusCode is 200 and sends an array with one recipe", async () => {
	expect.assertions(2);
	const recipe = await Recipe.create({ ...recipePayload });
	const { statusCode, body } = await supertest(app).get(`/recipes/`);
	expect(statusCode).toBe(200);
	expect(body[0].id).toBe(recipe.id);
});

test("If recipeId is not integer, getRecipe statusCode is 404", async () => {
	expect.assertions(1);
	const recipeId = "blah";
	const { statusCode } = await supertest(app).get(`/recipes/${recipeId}`);
	expect(statusCode).toBe(404);
});

test("Given no recipes exist, getRecipe statusCode is 404", async () => {
	expect.assertions(1);
	const recipeId = 1;
	const { statusCode } = await supertest(app).get(`/recipes/${recipeId}`);
	expect(statusCode).toBe(404);
});

test("Given a recipes exist, getRecipe statusCode is 200 and sends the requested recipe", async () => {
	expect.assertions(2);
	const recipe = await Recipe.create(recipePayload);
	const recipeId = recipe.id;
	const { statusCode, body } = await supertest(app).get(`/recipes/${recipeId}`);
	expect(statusCode).toBe(200);
	expect(body.id).toBe(recipeId);
});

test("Using wrong inputfields (noncoherent to database columns), createRecipe the statusCode is 400", async () => {
	expect.assertions(1);
	const { statusCode } = await supertest(app)
		.post(`/recipes/create`)
		.send(badRecipePayload);
	expect(statusCode).toBe(400);
});

test("Using correct inputfields (coherent to database columns), createRecipe the statusCode is 201 and object is created", async () => {
	expect.assertions(2);
	const { statusCode } = await supertest(app)
		.post(`/recipes/create`)
		.send(recipePayload);
	const recipe = await Recipe.findOne({ where: { name: recipePayload.name } });
	expect(statusCode).toBe(201);
	expect(!!recipe).toBe(true);
});

test("If recipeId is not integer, updateRecipe statusCode is 400", async () => {
	expect.assertions(1);
	const recipeId = "blah";
	const { statusCode } = await supertest(app)
		.put(`/recipes/update/${recipeId}`)
		.send(recipePayloadUpdate);
	expect(statusCode).toBe(400);
});

test("Using correct inputfields (noncoherent to database columns), updateRecipe the statusCode is 200 and the object is updated", async () => {
	expect.assertions(2);
	const recipe = await Recipe.create(recipePayload);
	const { statusCode } = await supertest(app)
		.put(`/recipes/update/${recipe.id}`)
		.send(recipePayloadUpdate);
	const recipeUpdate = await Recipe.findOne({ where: { id: recipe.id } });
	expect(statusCode).toBe(200);
	expect(recipeUpdate.name).toBe("PizzaUpdate");
});

test("Using wrong inputfields (noncoherent to database columns), updateRecipe the statusCode is 400", async () => {
	expect.assertions(1);
	const recipe = await Recipe.create(recipePayload);
	const { statusCode } = await supertest(app)
		.put(`/recipes/update/${recipe.id}`)
		.send(badRecipePayload);
	expect(statusCode).toBe(400);
});

test("If recipeId is not integer, deleteRecipe statusCode is 400", async () => {
	expect.assertions(1);
	const recipeId = "blah";
	const { statusCode } = await supertest(app).delete(
		`/recipes/delete/${recipeId}`
	);
	expect(statusCode).toBe(400);
});

test("If recipeId is integer, deleteRecipe statusCode is 200 and object is deleted", async () => {
	expect.assertions(2);
	const recipe = await Recipe.create(recipePayload);
	const { statusCode } = await supertest(app).delete(
		`/recipes/delete/${recipe.id}`
	);
	const deletedExists = await Recipe.findOne({ where: { id: recipe.id } });
	expect(statusCode).toBe(200);
	expect(!!deletedExists).toBe(false);
});
