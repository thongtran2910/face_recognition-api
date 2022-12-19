const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
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
app.use(
  session({
    secret: "thongdev29",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      maxAge: 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, knex, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
