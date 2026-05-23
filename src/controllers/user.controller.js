const userService = require("../services/user.service");
const { successResponse, errorResponse } = require("../utils/response.util");

function getUsers(req, res) {
  const users = userService.getAllUsers();
  res.status(200).json(successResponse("Users ro'yxati olindi", users));
}

function getUser(req, res) {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json(errorResponse("id yuborilishi shart"));
  }

  const result = userService.getUserById(id);

  if (!result.success) {
    return res.status(404).json(errorResponse(result.message));
  }

  return res.status(200).json(successResponse(result.message, result.data));
}

function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json(errorResponse("name va email yuborilishi shart"));
  }

  const newUser = userService.createUser(name.trim(), email.trim());
  res.status(201).json(successResponse("Yangi user yaratildi", newUser));
}

function updateUser(req, res) {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json(errorResponse("id yuborilishi shart"));
  }

  const { name, email } = req.body;

  if (!name && !email) {
    return res
      .status(400)
      .json(errorResponse("name yoki email yuborilishi shart"));
  }

  const result = userService.updateUser(id, {
    name: name?.trim(),
    email: email?.trim(),
  });

  if (!result.success) {
    if (result.message === "Foydalanuvchi topilmadi") {
      return res.status(404).json(errorResponse(result.message));
    }
    if (result.message === "Bu email band") {
      return res.status(409).json(errorResponse(result.message));
    }
    return res.status(400).json(errorResponse(result.message));
  }

  return res.status(200).json(successResponse(result.message, result.data));
}

function deleteUser(req, res) {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json(errorResponse("id yuborilishi shart"));
  }

  const result = userService.deleteUser(id);

  if (!result.success) {
    return res.status(404).json(errorResponse(result.message));
  }

  return res.status(200).json(successResponse(result.message, result.data));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
