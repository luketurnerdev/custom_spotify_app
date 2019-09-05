const User = require("./../database/models/user_model");


async function create(req, res, next) {
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
    .catch(err => next(new HTTPError(500, err)));
}

async function updateTokens() {

}

module.exports = {
  create,
  updateTokens
}