const { Router } = require("express");
const router = Router();
const { loginUser } = require("../controllers/auth.controller");

router.post("/login", loginUser);

module.exports = router;
