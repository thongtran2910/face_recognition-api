const handleSignin = (req, res, knex, bcrypt) => {
  const email = req.body.email;
  const password = req.body.password;
  knex
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      bcrypt.compare(password, data[0].hash, (err, response) => {
        if (response) {
          return knex
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("unable to get user"));
        } else {
          res.status(400).json("wrong credentials");
        }
      });
    })
    .catch((err) => res.status(400).json("User doesn't exist"));
};

module.exports = {
  handleSignin: handleSignin,
};
