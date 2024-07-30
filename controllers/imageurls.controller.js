const { ImageUrl } = require("../models");

const findOne = async (req, res) => {
  const id = req.params.id;

  ImageUrl.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ImageUrl with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ImageUrl with id=" + id,
      });
    });
};

const deleteImageUrl = async (req, res) => {
  const id = req.params.id;

  ImageUrl.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "ImageUrl was deleted successfully." });
      } else {
        res.send({
          message: `Cannot delete ImageUrl with id=${id}. Maybe ImageUrl was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting ImageUrl with id=" + id,
      });
    });
};

const deleteAll = async (req, res) => {
  const id = req.params.id;

  ImageUrl.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ImageUrls were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while removing all ImageUrls.",
      });
    });
};

const getAllImageUrls = async (req, res) => {
  try {
    const imageUrls = await ImageUrl.findAll();
    return res.status(200).json({ imageUrls });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  findOne,
  deleteImageUrl,
  deleteAll,
  getAllImageUrls,
};
