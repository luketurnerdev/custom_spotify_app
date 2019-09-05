// GET to "/"
// Show homepage
async function homepage(req, res) {

  console.log("COOKIES:", res.cookies);
    // res.redirect("/");
  }

function register(req, res) {

  // res.json("ok");
  res.render("pages/register")
  // require("./../views/pages/homepage")
}

module.exports = {
    homepage,
    register
}