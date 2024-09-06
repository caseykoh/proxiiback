const { Router } = require("express");
const router = Router();
const {
  findOne,
  getAllImageUrls,
  deleteImageUrl,
  deleteAll,
} = require("../controllers/imageurls.controller");

router.get("/", getAllImageUrls);
router.get("/:id", findOne);
router.delete("/:id", deleteImageUrl);
router.delete("/", deleteAll);

module.exports = router;
