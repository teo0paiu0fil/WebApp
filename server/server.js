const express = require("express");
const cors = require("cors");
const database = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:` + PORT);
});

app.post("/api/v1/register", async (req, res) => {
  const { email, username, password } = req.body;
  const user = await database.findUser(email);
  if (user != null) res.status(409).send({ msg: "user already exists" });
  else {
    database.insertUser(email, username, password);
    res.status(201).send({ msg: "succesfully register plz login" });
  }
});

app.get("/api/v1/login", (req, res) => {
  database.findUser(req.body.email).then((user) => {
    console.log(user);
    if (user == null) {
      res.status(400).send({ msg: "user not found" });
    } else {
      bcrypt.compare(req.body.password, user.hashpass, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { user_id: req.body.email },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.send(user);
        } else {
          res.status(400).send({ msg: "incorect password" });
        }
      });
    }
  });
});

