"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Appointments", "instagram", Sequelize.STRING),
      queryInterface.addColumn("Appointments", "design_type", Sequelize.STRING),
      queryInterface.addColumn("Appointments", "size", Sequelize.STRING),
      queryInterface.addColumn("Appointments", "placement", Sequelize.STRING),
      queryInterface.addColumn("Appointments", "description", Sequelize.STRING),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Appointments", "instagram"),
      queryInterface.removeColumn("Appointments", "design_type"),
      queryInterface.removeColumn("Appointments", "size"),
      queryInterface.removeColumn("Appointments", "placement"),
      queryInterface.removeColumn("Appointments", "description"),
    ]);
  },
};
