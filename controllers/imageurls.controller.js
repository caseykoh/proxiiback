const { ImageUrl } = require("../models");

exports.show = (request, response) => {
  return ImageUrl.findByPk(request.params.id, {})
    .then((imageUrl) => {
      if (!imageUrl) {
        response.status(404).send({ error: "ImageUrl not found" });
      } else {
        response.status(200).send(imageUrl);
      }
    })
    .catch((error) => response.status(400).send(error));
};
