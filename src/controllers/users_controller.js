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
  console.log('inside get user function')
  let user = await findUserByToken(req,res)
  .then(resp => {
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

// PUT to "/auth/register"
// Update the user's tokens in the database.
async function updateTokens(id, newValues) {
  await User
    .findOneAndUpdate(
      {spotify_uid: id },
      {
        access_token: newValues.access_token,
        refresh_token: newValues.refresh_token
      },
      { 
        new: true,
        useFindAndModify: false
      }
    )
    .then(resp => res.json(resp))
    .catch(err => new HTTPError(500, err));
}

module.exports = {
  create,
  getUser,
  getAllUsers,
  updateTokens
}