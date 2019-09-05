// GET to "/"
// Show homepage
function homepage(req, res) {
  console.log(req.cookies.tokens)
  res.render("pages/homepage")
}
function register(req, res) {
  res.render("pages/register")
}

module.exports = {
    homepage,
    register
}