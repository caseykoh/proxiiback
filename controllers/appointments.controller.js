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

const findOne = async (req, res) => {
  const id = req.params.id;

  Appointments.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Appointment with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Appointment with id=" + id,
      });
    });
};

const update = async (req, res) => {
  const id = req.params.id;

  Appointments.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Appointment was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Appointment with id=" + id,
      });
    });
};

const deleteAppointment = async (req, res) => {
  const id = req.params.id;

  Appointments.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Appointment was deleted successfully." });
      } else {
        res.send({
          message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Appointment with id=" + id,
      });
    });
};

const deleteAll = async (req, res) => {
  const id = req.params.id;

  Appointments.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Appointments were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while removing all appointments.",
      });
    });
};

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
  findOne,
  update,
  deleteAppointment,
  deleteAll,
  getAllAppointments,
};
