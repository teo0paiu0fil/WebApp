const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8888;


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:{s}.`, PORT);
});


