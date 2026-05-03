import fs from "fs";

const file = "./models/users.json";

function getAllUsers() {
  const data = JSON.parse(fs.readFileSync(file));
  return data.users;
}

function addUser(user) {
  const data = JSON.parse(fs.readFileSync(file));
  data.users.push(user);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find(u => u.email === email);
}

export default {
  getAllUsers,
  addUser,
  getUserByEmail
};