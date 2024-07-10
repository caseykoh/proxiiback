"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointments.hasMany(models.ImageUrl, {
        foreignKey: "appointmentId",
        as: "appointments",
      });
    }
  }
  Appointments.init(
    {
      full_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      instagram: { type: DataTypes.STRING, allowNull: true },
      design_type: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: false },
      placement: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Appointments",
    }
  );
  return Appointments;
};
