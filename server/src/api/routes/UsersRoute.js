const { Router } = require("express");
const { UsersController } = require("../controllers");

const router = Router();

router.get("/", UsersController.getUsers);

router.get("/:id", UsersController.getUser);

router.post("/create", UsersController.createUser);

router.put("/update/:id", UsersController.updateUser);

router.delete("/delete/:id", UsersController.deleteUser);

module.exports = router;
