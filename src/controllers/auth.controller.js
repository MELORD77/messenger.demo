const authService = require("../services/auth.service");
const { successResponse, errorResponse } = require("../utils/response.util");

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(errorResponse("email va password yuborilishi shart"));
  }

  const result = authService.login(email, password);

  if (!result.success) {
    return res.status(401).json(errorResponse(result.message));
  }

  return res.status(200).json(successResponse(result.message, result.data));
}

function logout(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(errorResponse("email yuborilishi shart"));
  }

  const result = authService.logout(email);

  if (!result.success) {
    return res.status(404).json(errorResponse(result.message));
  }

  return res.status(200).json(successResponse(result.message, result.data));
}

module.exports = {
  login,
  logout,
};
