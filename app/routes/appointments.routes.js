const { Router } = require("express");
const router = Router();
const {
  create,
  getAllAppointments,
  findOne,
  update,
  deleteAppointment,
  deleteAll,
} = require("../controllers/appointments.controller");

router.post("/", create);
router.get("/", getAllAppointments);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", deleteAppointment);
router.delete("/", deleteAll);

module.exports = router;
