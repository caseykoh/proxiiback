"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Appointments", "description", {
        type: Sequelize.STRING(500),
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Appointments", "description", {
        type: Sequelize.STRING(),
      }),
    ]);
  },
};
