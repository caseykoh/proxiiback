const { Router } = require("express");
const router = Router();
const { sendMail } = require("../controllers/email.controller");

router.post("/", sendMail);

module.exports = router;
