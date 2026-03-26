const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/userAuthController");

// Register
router.get("/register/view", AuthController.registerView);
router.post("/register/store", AuthController.registerCreate);

// Login
router.get("/login/view", AuthController.LoginView);
router.post("/login/store", AuthController.LoginCreate);
router.get("/logout", AuthController.logout);

module.exports = router;
