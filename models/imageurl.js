"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageUrl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImageUrl.belongsTo(models.Appointments);
    }
  }
  ImageUrl.init(
    {
      url: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "ImageUrl",
    }
  );
  return ImageUrl;
};
