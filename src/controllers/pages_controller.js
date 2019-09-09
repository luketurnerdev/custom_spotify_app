// GET to "/"
// Show homepage
function homepage(req, res) {
  console.log(req.cookies)
  res.render("pages/homepage")
}
function register(req, res) {
  res.render("pages/register")
}

function logout(req, res) {
  console.log('inside')
  res.clearCookie("tokens");
  res.redirect("pages/register")
}

module.exports = {
    homepage,
    register,
    logout
}