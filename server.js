const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5433,
    user: "postgres",
    password: "thong2910",
    database: "smart-brain",
  },
});
const register = require("./controllers/register");
const signin = require("./controllers/signin");

const corsConfig = {
  origin: "*",
};
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsConfig));

app.get("/", (req, res) => {
  res.send("it is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, knex, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
});
