const express = require("express");
const cors = require("cors");
const database = require("./database");
const { comparePassword } = require("./hashing");


const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:` + PORT);
});

app.post("/api/v1/signup", (req, res) => {
  // todo
});

app.get("/api/v1/signin", (req, res) => {
  database.findUser(req.body.email).then((user) => {
      // if (user == null) return null;
      // if(comparePassword(req.body.password, user.password))
        res.send({ token : ''}) // todo
  });
});

