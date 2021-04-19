const db = require("./dbConfig");

module.exports = {
  findUser,
  registerUser,
  changePassowrd,
  changeUsername,
  changeEmail,
  deleteUser
};

function findUser(email) {
  const user = db("USERS").first("*").where("email", email);
  return user;
}

async function registerUser(newUser) {
  try {
    await db("USERS").insert({
      username: newUser.username,
      hash: newUser.password,
      email: newUser.email,
    });
  } catch {
    return { ERROR: "Internal Model Error" };
  }
  return findUser(newUser.email);
}

async function changePassowrd(email, newPassword) {
  try {
    await db("USERS").where({ email: email }).update("hash", newPassword);
  } catch {
    return { ERROR: "Internal Model Error." };
  }
}

async function changeUsername(email, newUsername) {
  try {
    await db("USERS").where({ email: email }).update("username", newUsername);
  } catch {
    return { ERROR: "Internal Model Error." };
  }
}

async function changeEmail(email, newEmail) {
  try {
    await db("USERS").where({ email: email }).update("email", newEmail);
  } catch {
    return { ERROR: "Internal Model Error." };
  }
}

async function deleteUser(user_id) {
  try {
    await db("UNSORTED").where({ user: user_id }).del();
    await db("SORTED").where({ user: user_id }).del();
    await db("USERS").where({ user_id: user_id }).del();
  } catch (err) {
    return { ERROR: "Internal Model Error.", details: err };
  }
  return { SUCCESS: "Account and account data has been removed." };
}
