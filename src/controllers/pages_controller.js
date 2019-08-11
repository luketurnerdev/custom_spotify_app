// GET to "/"
// Show homepage
async function homepage(req, res) {

  console.log("COOKIES:", req.cookies);
    // res.redirect("/");
  }

module.exports = {
    homepage
}