"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Appointments", "full_name", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Appointments", "email", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Appointments", "design_type", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Appointments", "size", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Appointments", "placement", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Appointments", "description", {
        type: Sequelize.STRING(500),
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Appointments", "full_name", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Appointments", "email", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Appointments", "design_type", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Appointments", "size", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Appointments", "placement", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Appointments", "description", {
        type: Sequelize.STRING(500),
        allowNull: true,
      }),
    ]);
  },
};
