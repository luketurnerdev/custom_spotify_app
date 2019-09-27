// GET to "/"
// Show homepage
const axios = require('axios');
const findUserByToken = require("./_findUserByToken");

async function homepage(req, res) {
  res.render("pages/homepage")
}
function register(req, res) {
  res.render("pages/register");
}

function dashboard(req, res) {
  res.render("pages/dashboard");
}
function logout(req, res) {
  console.log('inside')
  res.clearCookie("tokens");
  res.redirect("pages/register");
}

function loggedOut(req, res) {
  res.render("pages/loggedout");
}

module.exports = {
    homepage,
    loggedOut,
    register,
    dashboard,
    logout
}