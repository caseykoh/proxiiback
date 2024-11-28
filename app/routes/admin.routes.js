const { Router } = require("express");
const router = Router();
const {
  create,
  getAllAppointments,
  findOne,
  update,
  deleteAppointment,
  deleteAll,
} = require("../controllers/admin.controller");

router.post("/appointments/", create);
router.get("/appointments/", getAllAppointments);
router.get("/appointments/:id", findOne);
router.put("/appointments/:id", update);
router.delete("/appointments/:id", deleteAppointment);
router.delete("/appointments/", deleteAll);

module.exports = router;
