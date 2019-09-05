const express = require("express");
const router = express.Router();
const authRoutes = require("./auth_routes");

const pagesController = require("./../controllers/pages_controller")

router.get("/", pagesController.homepage);

// Auth routes
router.use("/auth", authRoutes);



module.exports = router;