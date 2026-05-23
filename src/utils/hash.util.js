function hashPassword(password) {
  return `hashed_${password}`;
}

function comparePassword(plainPassword, hashedPassword) {
  return hashPassword(plainPassword) === hashedPassword;
}

module.exports = {
  hashPassword,
  comparePassword,
};
