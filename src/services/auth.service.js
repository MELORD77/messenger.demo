const { readUsers, writeUsers } = require("../data/users.data");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const { generateToken } = require("../utils/token.util");

function login(email, password) {
  const users = readUsers();
  const foundUser = users.find((user) => user.email === email);

  if (!foundUser) {
    return { success: false, message: "Email yoki password noto'g'ri" };
  }

  const isPasswordCorrect = comparePassword(password, foundUser.password);

  if (!isPasswordCorrect) {
    return { success: false, message: "Email yoki password noto'g'ri" };
  }

  const token = generateToken({
    id: foundUser.id,
    email: foundUser.email,
  });

  return {
    success: true,
    message: "Login muvaffaqiyatli bajarildi",
    data: {
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
    },
  };
}

function logout(email) {
  const users = readUsers();
  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return { success: false, message: "User topilmadi" };
  }

  const [deletedUser] = users.splice(userIndex, 1);
  writeUsers(users);

  return {
    success: true,
    message: "User listdan o'chirildi",
    data: {
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
    },
  };
}

module.exports = {
  login,
  logout,
};
