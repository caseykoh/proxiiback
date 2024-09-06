const { Appointments, ImageUrl, sequelize } = require("../models");

const appointmentOptions = {
  include: [ImageUrl],
};

const create = async (req, res) => {
  if (!req.body.full_name) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const {
    full_name,
    email,
    instagram,
    design_type,
    size,
    placement,
    description,
    createdAt,
    updatedAt,
    urls,
  } = req.body;

  const appointmentFields = {
    full_name,
    email,
    instagram,
    design_type,
    size,
    placement,
    description,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
  };

  const t = await sequelize.transaction();

  try {
    const appointment = await Appointments.create(appointmentFields, {
      transaction: t,
    });
    const imageUrlPromise = urls.map(
      async (url) =>
        await ImageUrl.create(
          {
            url,
            AppointmentId: appointment.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            transaction: t,
          }
        )
    );
    await Promise.all(imageUrlPromise);
    await t.commit();
    res.status(201).json({
      appointment,
      message: "Appointment created successfully",
    });
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      message:
        error.message || "Some error occurred while adding an appointment.",
    });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  Appointments.findByPk(id, appointmentOptions)
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
