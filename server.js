const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "containers-us-west-79.railway.app",
    user: "postgres",
    password: "PJIy6Is6ndI5waWnhvS5",
    database: "railway",
  },
});
const register = require("./controllers/register");
const signin = require("./controllers/signin");

const corsConfig = {
  origin: "*",
};

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
