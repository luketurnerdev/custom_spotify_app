const express = require("express");
const router = express.Router();
const authRoutes = require("./auth_routes");

const pagesController = require("./../controllers/pages_controller")

let users = { 
  name : "Ritik", 
  Age : "18"
  } 
router.get('/setuser', (req, res)=>{ 
  res.cookie("userData", users); 
  res.send('user data added to cookie'); 
  }); 

  //Iterate users data from cookie 
router.get('/getuser', (req, res)=>{ 
  //shows all the cookies 
  console.log(req.cookies);
  res.send("hello")
  }); 
// router.get("/", pagesController.homepage);
// Auth routes
router.use("/auth", authRoutes);



module.exports = router;