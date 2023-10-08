const express = require("express");
const userhandler = require("../routerhandler/userhandler");
const router = express.Router();

router.post("/login", userhandler.login);
router.get("/info", userhandler.info);
router.post("/logout", userhandler.logout);

module.exports = router;
