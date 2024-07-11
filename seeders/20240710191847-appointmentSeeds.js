"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Appointments", [
      {
        id: 5,
        full_name: "Josh D",
        email: "joshd@test.com",
        instagram: "joshd",
        design_type: "freehand",
        size: "3 inches",
        placement: "back",
        description: "Here are some examples",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Appointments", null, {});
  },
};
