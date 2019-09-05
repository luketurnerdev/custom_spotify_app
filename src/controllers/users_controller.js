const User = require("./../database/models/user_model");
const findUserByToken = require("./_findUserByToken");



async function create(req, res, next) {
  console.log("Ran create function")
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

  await User
    .create({
      spotify_uid,
      email,
      name,
      access_token,
      refresh_token,
      created_at,
      updated_at
    })
    .then(resp => res.status(201).json(resp))
    .catch(err => console.log(err));
}

async function getUser(req, res, next) {
  let user = await findUserByToken(req,res)
  .then(resp => {
    console.log(resp);
    res.json(resp);
  })
  .catch(err => {
    console.log(err);
  })
}
async function getAllUsers(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error " + err ))
}

async function updateTokens() {

}

module.exports = {
  create,
  getUser,
  getAllUsers,
  updateTokens
}