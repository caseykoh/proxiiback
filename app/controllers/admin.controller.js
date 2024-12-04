const { Appointments, ImageUrl, Flash, sequelize } = require("../models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token (e.g., Bearer <token>)
  if (!token) return res.status(401).send("Access denied: No token provided");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Access denied: Invalid token");
    req.user = user; // Add user info (ID, role) to the request object
    next(); // Proceed to the next middleware or route
  });
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied: You are not an admin");
  }
  next(); // Proceed to the next middleware or route
}

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

const createFlash = async (req, res) => {
  if (!req.body.mainImageUrl) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const {
    price,
    dimensions,
    mainImageUrl,
    extraImageUrls,
    is_active,
    createdAt,
    updatedAt,
  } = req.body;

  try {
    const flashDetails = {
      price,
      dimensions,
      mainImageUrl,
      extraImageUrls,
      is_active,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    };

    const flash = await Flash.create(flashDetails);

    res.status(201).json({
      flash,
      message: "Flash created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while adding a flash.",
    });
  }
};

const updateFlash = async (req, res) => {
  const id = req.params.id;

  Flash.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Flash was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Flash with id=${id}. Maybe Flash was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Flash with id=" + id,
      });
    });
};

const deleteFlash = async (req, res) => {
  const id = req.params.id;

  Flash.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Flash was deleted successfully." });
      } else {
        res.send({
          message: `Cannot delete Flash with id=${id}. Maybe Flash was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Flash with id=" + id,
      });
    });
};

module.exports = {
  authenticateJWT,
  authorizeAdmin,
  create,
  findOne,
  update,
  deleteAppointment,
  deleteAll,
  getAllAppointments,
  createFlash,
  updateFlash,
  deleteFlash,
};
