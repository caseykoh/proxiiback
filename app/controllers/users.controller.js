const bcrypt = require("bcryptjs");
const { Users } = require("../models");

const create = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const { username, password, role, createdAt, updatedAt } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userFields = {
      username,
      password: hashedPassword,
      role,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    };

    const user = await Users.create(userFields);

    res.status(201).json({
      user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while adding a user.",
    });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

const update = async (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was updated successfully." });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was deleted successfully." });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting User with id=" + id,
      });
    });
};

const deleteAll = async (req, res) => {
  Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while removing all users.",
      });
    });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  create,
  findOne,
  update,
  deleteUser,
  deleteAll,
  getAllUsers,
};
