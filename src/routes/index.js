const express = require("express");
const router = express.Router();
const authRoutes = require("./auth_routes");
const usersRoutes = require("./users_routes");
const userDataRoutes = require("./user_data_routes");


const pagesController = require("./../controllers/pages_controller")

router.get("/", pagesController.homepage);

// Auth routes
router.use("/auth", authRoutes);

// Users routes (user accounts)
router.use("/users", usersRoutes);

// User data routes (top artists, etc)
router.use("/user_data", userDataRoutes);

module.exports = router;