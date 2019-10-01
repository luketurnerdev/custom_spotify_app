const express = require("express");
const router = express.Router();
const authRoutes = require("./auth_routes");
const usersRoutes = require("./users_routes");
const userDataRoutes = require("./user_data_routes");
const pagesController = require("./../controllers/pages_controller")
const passport = require('passport');


//Root (authenticate with spotify strategy)
// router.get("/", passport.authenticate('spotify'), pagesController.homepage);

router.get("/dashboard", pagesController.dashboard);

// Auth routes
router.use("/auth", authRoutes);

// Users routes (user accounts)
router.use("/users", usersRoutes);

// User data routes (top artists, etc)
router.use("/user_data", userDataRoutes);

module.exports = router;