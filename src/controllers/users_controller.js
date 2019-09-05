const User = require("./../database/models/user_model");

async function create(req, res, next) {
  console.log("Ran create function")
  console.log(req.body);
  res.json("ok");
  let {
    spotify_uid,
    email,
    name,
    access_token,
    refresh_token,
    created_at,
    updated_at
  } = req.body;

  console.log(req.body)

  // await User
  //   .create({
  //     spotify_uid,
  //     email,
  //     name,
  //     access_token,
  //     refresh_token,
  //     created_at,
  //     updated_at
  //   })
  //   .then(resp => res.status(201).json(resp))
  //   .catch(err => next(new HTTPError(500, err)));
}

async function getUsers(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error " + err ))
}

async function updateTokens() {

}

module.exports = {
  create,
  getUsers,
  updateTokens
}