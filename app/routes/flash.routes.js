const { Router } = require("express");
const router = Router();
const { getAllFlash, findOne } = require("../controllers/flash.controller");

router.get("/", getAllFlash);
router.get("/:id", findOne);

module.exports = router;
