const express = require("express");
const cors = require("cors");
const database = require("./database");


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
  console.log(user);
  if (user == null)
    res.status(404).send('user not found');
  else
    res.send({ token : ''}) // todo
  });
});