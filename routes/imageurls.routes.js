const { Router } = require("express");
const router = Router();
const { show } = require("../controllers/imageurls.controller");

router.get("/:id", show);

module.exports = router;
