const { Router } = require("express");
const router = Router();
const appointmentsController = require("../controllers/appointments.controller");

router.post("/", appointmentsController.create);
router.get("/", appointmentsController.getAllAppointments);
router.get("/:id", appointmentsController.findOne);
router.put("/:id", appointmentsController.update);
router.delete("/:id", appointmentsController.deleteAppointment);
router.delete("/", appointmentsController.deleteAll);

module.exports = router;
