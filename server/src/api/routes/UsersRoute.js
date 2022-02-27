const { Router } = require("express");
const { UsersController } = require("../controllers");

const router = Router();

router.get("/users", UsersController.getUsers);

router.get("/users/:id", UsersController.getUser);

router.put("/users/update/:id", UsersController.updateUser);

router.delete("users/delete/:id", UsersController.deleteUser);

router.post("/login", UsersController.loginUser);

router.post("/logout", UsersController.logoutUser);

router.post("/register", UsersController.register);

router.get("/me", UsersController.me);

module.exports = router;
