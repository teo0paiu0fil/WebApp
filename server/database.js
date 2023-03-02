const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

// secret .env on relese
const URI = process.env.MONGO_URL;


module.exports.insertUser = async function insertUser(
  email,
  username,
  password
) {
  const client = new MongoClient(URI);
  const database = client.db("webapp");
  const users = database.collection("user");
  var hashpass = await bcrypt
    .genSalt(parseInt(process.env.SALT || 9 ))
    .then((salt) => {
      return bcrypt.hash(password, salt);
    }).then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));

  const token = jwt.sign(
    { user_id: email},
    process.env.TOKEN_SECRET || 'some secret',
    {
      expiresIn: "2h",
    }
  );

  const user = {
    _id: email,
    username: username,
    hashpass: hashpass,
    token: token,
  };

  const exists = await module.exports.findUser(email);
  if (exists == null) await users.insertOne(user);
  return user;
};

module.exports.findUser = async function findUser(email) {
  const client = new MongoClient(URI);
  const database = client.db("webapp");
  const users = database.collection("user");
  const query = { _id: email };

  const user = await users.findOne(query);

  return user;
};
