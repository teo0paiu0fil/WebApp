const express = require("express");
const cors = require("cors");
const database = require("./database");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:` + PORT);
});

app.post("/api/v1/register", async (req, res) => {
  const { email, username, password } = req.body;
  const user = await findUser(email);
  if (user != null)
    res.status(409).send("user already exists");
  else {
    database.insertUser(email, username, password);
  }
});

app.get("/api/v1/login", (req, res) => {
  database.findUser(req.body.email).then((user) => {
  console.log(user);
  if (user == null) {
    res.status(400).send('user not found');
  } else {
    var isWritePass = bcrypt
    .compare(req.body.password, user.hashpass)
    .then(res => {
      return res
    })
    .catch(err => console.error(err.message)) 
    
    if(isWritePass) {
      const token = jwt.sign(
        { user_id:  email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.send(user);
    } else
      res.status(400).send('incorect password')

  }});
});

