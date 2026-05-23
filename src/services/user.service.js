const { readUsers, writeUsers } = require("../data/users.data");

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

function getAllUsers() {
  const users = readUsers();
  return users.map(sanitizeUser);
}

function getUserById(id) {
  const users = readUsers();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return { success: false, message: "Foydalanuvchi topilmadi" };
  }

  return {
    success: true,
    message: "Foydalanuvchi topildi",
    data: sanitizeUser(user),
  };
}

function createUser(name, email) {
  const users = readUsers();

  if (users.some((u) => u.email === email)) {
    return { success: false, message: "Bu email avval royhatdan o'tgan" };
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    password: "hashed_default123",
  };

  users.push(newUser);
  writeUsers(users);

  return sanitizeUser(newUser);
}

function updateUser(id, updates) {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return { success: false, message: "Foydalanuvchi topilmadi" };
  }

  const { name, email } = updates;

  if (!name && !email) {
    return { success: false, message: "name yoki email yuborilishi shart" };
  }

  if (email) {
    const emailBand = users.some((u) => u.email === email && u.id !== id);
    if (emailBand) {
      return { success: false, message: "Bu email band" };
    }
  }

  if (name) users[index].name = name;
  if (email) users[index].email = email;

  writeUsers(users);

  return {
    success: true,
    message: "Foydalanuvchi yangilandi",
    data: sanitizeUser(users[index]),
  };
}

function deleteUser(id) {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return { success: false, message: "Foydalanuvchi topilmadi" };
  }

  const [deletedUser] = users.splice(index, 1);
  writeUsers(users);

  return {
    success: true,
    message: "Foydalanuvchi o'chirildi",
    data: sanitizeUser(deletedUser),
  };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
