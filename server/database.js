const { MongoClient } = require("mongodb");
const { cryptPassword } = require("./hashing");

// secret .env on relese
const URI =
  "mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true";

module.exports.insertUser = async function insertUser(
  email,
  username,
  password
) {
  const client = new MongoClient(URI);
  const database = client.db("webapp");
  const users = database.collection("user");

  const user = {
    _id: email,
    username: username,
    password: cryptPassword(password),
  };

  const exists = await module.exports.findUser(email);
  if (exists == null) await users.insertOne(user);
};

module.exports.findUser = async function findUser(email) {
  const client = new MongoClient(URI);
  const database = client.db("webapp");
  const users = database.collection("user");
  const query = { _id: email };

  const options = {
    projection: { _id: 1, username: 0, password: 1 },
  };

  const user = await users.findOne(query, options);

  return user;
};
