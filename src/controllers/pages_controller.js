// GET to "/"
// Show homepage
async function homepage(req, res) {

  console.log("COOKIES:", res.cookies);
    // res.redirect("/");
  }

module.exports = {
    homepage
}