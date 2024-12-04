const { Router } = require("express");
const router = Router();
const { getAllFlash, findOne } = require("../controllers/flash.controller");

router.get("/flash/", getAllFlash);
router.get("/flash/:id", findOne);

module.exports = router;
