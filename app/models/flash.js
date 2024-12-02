"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flash extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Flash.init(
    {
      price: { type: DataTypes.STRING, allowNull: true },
      dimensions: { type: DataTypes.STRING, allowNull: true },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      mainImageUrl: { type: DataTypes.STRING, allowNull: false },
      extraImageUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flash",
    }
  );
  return Flash;
};
