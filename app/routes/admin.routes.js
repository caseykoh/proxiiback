const { Router } = require("express");
const router = Router();
const {
  create,
  getAllAppointments,
  findOne,
  update,
  deleteAppointment,
  deleteAll,
  createFlash,
  updateFlash,
  deleteFlash,
} = require("../controllers/admin.controller");

router.post("/appointments/", create);
router.get("/appointments/", getAllAppointments);
router.get("/appointments/:id", findOne);
router.put("/appointments/:id", update);
router.delete("/appointments/:id", deleteAppointment);
router.delete("/appointments/", deleteAll);
router.post("/flash/", createFlash);
router.put("/flash/:id", updateFlash);
router.delete("/flash/:id", deleteFlash);

module.exports = router;
