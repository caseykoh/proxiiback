const { Appointments } = require("../models");

const create = async (req, res) => {
  if (!req.body.full_name) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const appointment = {
    full_name: req.body.full_name,
    email: req.body.email,
    createdAt: req.body.createdAt || new Date(),
    updatedAt: req.body.updatedAt || new Date(),
  };

  Appointments.create(appointment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Appointment.",
      });
    });
};
const findOne = async (req, res) => {};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.findAll({});
    return res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  create,
  getAllAppointments,
};
