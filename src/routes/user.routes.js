const express = require("express");
const userController = require("../controllers/user.controller");
const { createUserSchema, updateUserSchema, validate } = require("../validators/user.validator");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", validate(createUserSchema), userController.createUser);
router.put("/:id", validate(updateUserSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
