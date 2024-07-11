"use strict";

const { urlencoded } = require("express");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("ImageUrls", [
      {
        url: "link.com",
        AppointmentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: "link.com/second",
        AppointmentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("ImageUrls", null, {});
  },
};
