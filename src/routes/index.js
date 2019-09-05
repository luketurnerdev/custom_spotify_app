const express = require("express");
const router = express.Router();
const authRoutes = require("./auth_routes");
const usersRoutes = require("./users_routes");


const pagesController = require("./../controllers/pages_controller")

router.get("/", pagesController.homepage);

// Auth routes
router.use("/auth", authRoutes);

// Users routes
router.use("/users", usersRoutes);


module.exports = router;