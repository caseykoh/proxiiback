const { Router } = require("express");
const router = Router();
const appointmentsController = require("../controllers/appointments.controller");
router.get("/", appointmentsController.getAllAppointments);
router.post("/", appointmentsController.create);

module.exports = router;
