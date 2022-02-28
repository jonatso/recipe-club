const createServer = require("../../helpers/server");
const app = createServer();
const supertest = require("supertest");
const db = require("../../models");
const { Users } = require("../../models");

const userPayload = {
   username: "bob",
   email: "bob@bob.com",
   password: "bob",
};

const updateUserPayload = {
   username: "bobUpdate",
   email: "bob@bob.com",
   password: "bob",
};

const badUserPayload = {
   name: "bob",
   address: "bob@bob.com",
   not_password: "bob",
};

// START BLOCK
// VERY IMPORTANT FOR ASYNC TESTING

beforeEach(async () => {
   await db.sequelize.sync({ force: true });
});

afterAll(async () => {
   await db.sequelize.close();
});

// END BLOCK

test("Given no users exist, status should be 404", async () => {
   expect.assertions(1);
   const { statusCode, body } = await supertest(app).get(`/users/`);
   expect(statusCode).toBe(404);
});

test("Given a user exist, status should be 200 and we get array of one user", async () => {
   expect.assertions(2);
   const user = await Users.create({ ...userPayload });
   const { statusCode, body } = await supertest(app).get(`/users/`);
   expect(statusCode).toBe(200);
   expect(body[0].id).toBe(user.id);
});

test("If userId is not integer, getUser statusCode is 404", async () => {
   expect.assertions(1);
   const userId = "blah";
   const { statusCode } = await supertest(app).get(`/users/${userId}`);
   expect(statusCode).toBe(404);
});

test("Given no users exist with a specific id, getUser statusCode is 404", async () => {
   expect.assertions(1);
   const userId = 1;
   const { statusCode } = await supertest(app).get(`/users/${userId}`);
   expect(statusCode).toBe(404);
});

test("Given a user exist, getUser statusCode is 200 and sends the requested user", async () => {
   expect.assertions(2);
   const user = await Users.create(userPayload);
   const userId = user.id;
   const { statusCode, body } = await supertest(app).get(`/users/${userId}`);
   expect(statusCode).toBe(200);
   expect(body.id).toBe(userId);
});

test("Using wrong inputfields, (noncoherent to database columns)createUser the statusCode is 400", async () => {
   expect.assertions(1);
   const { statusCode } = await supertest(app).post(`/users/create`).send(badUserPayload);
   expect(statusCode).toBe(400);
});

test("Using correct inputfields (coherent to database columns), createUser the statusCode is 201 and object is created", async () => {
   expect.assertions(2);
   const { statusCode } = await supertest(app).post(`/users/create`).send(userPayload);
   const user = await Users.findOne({
      where: { username: userPayload.username },
   });
   expect(statusCode).toBe(201);
   expect(!!user).toBe(true);
});

test("If userId is not integer, updateUser statusCode is 400", async () => {
   expect.assertions(1);
   const userId = "blah";
   const { statusCode } = await supertest(app).put(`/users/update/${userId}`).send(updateUserPayload);
   expect(statusCode).toBe(400);
});

test("Using correct inputfields (noncoherent to database columns), updateUser the statusCode is 200 and the object is updated", async () => {
   expect.assertions(2);
   const user = await Users.create(userPayload);
   const { statusCode } = await supertest(app).put(`/users/update/${user.id}`).send(updateUserPayload);
   const userUpdate = await Users.findOne({ where: { id: user.id } });
   expect(statusCode).toBe(200);
   expect(userUpdate.username).toBe("bobUpdate");
});

test("Using wrong inputfields (noncoherent to database columns), updateUser the statusCode is 400", async () => {
   expect.assertions(1);
   const user = await Users.create(userPayload);
   const { statusCode } = await supertest(app).put(`/users/update/${user.id}`).send(badUserPayload);
   expect(statusCode).toBe(400);
});

test("If userId is not integer, deleteUser statusCode is 400", async () => {
   expect.assertions(1);
   const userId = "blah";
   const { statusCode } = await supertest(app).delete(`/users/delete/${userId}`);
   expect(statusCode).toBe(400);
});

test("If userId is integer, deleteUser statusCode is 200 and object is deleted", async () => {
   expect.assertions(2);
   const user = await Users.create(userPayload);
   const { statusCode } = await supertest(app).delete(`/users/delete/${user.id}`);
   const deletedExists = await Users.findOne({ where: { id: user.id } });
   expect(statusCode).toBe(200);
   expect(!!deletedExists).toBe(false);
});
