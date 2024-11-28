const { Router } = require("express");
const router = Router();
const {
  create,
  getAllUsers,
  findOne,
  update,
  deleteUser,
  deleteAll,
} = require("../controllers/users.controller");

router.post("/", create);
router.get("/", getAllUsers);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", deleteUser);
router.delete("/", deleteAll);

module.exports = router;
