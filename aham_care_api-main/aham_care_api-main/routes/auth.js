const express = require("express");
const router = express.Router();
const Auth = require("../Controllers/Auth/register");
const AdminAuth = require("../Controllers/Auth/admin");
const User = require("../Controllers/Auth/user");
const regenerateToken = require("../Controllers/Auth/regenerateToken");

// User Auth
router.post("/register", Auth.register);
router.post("/login", Auth.login);
router.post("/getOtp", Auth.getOtp);
router.post("/verifyOtp", Auth.verifyOtp);
router.post("/regenerate-token", regenerateToken);

// Password
router.post("/verify", User.verifyUser);
router.post("/resetPassword", User.resetPassword);

// Admin Auth
router.post("/admin-register", AdminAuth.register);
router.post("/admin-login", AdminAuth.login);

module.exports = router;
