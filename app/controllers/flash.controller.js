const { Flash } = require("../models");

const findOne = async (req, res) => {
  const id = req.params.id;

  Flash.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Flash with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Flash with id=" + id,
      });
    });
};

const getAllFlash = async (req, res) => {
  try {
    const flash = await Flash.findAll({});
    return res.status(200).json({ flash });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  findOne,
  getAllFlash,
};
