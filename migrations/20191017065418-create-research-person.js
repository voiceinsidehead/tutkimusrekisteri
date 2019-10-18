"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ResearchPerson", {
      researchID: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      identificationNumber: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      idetificationHash: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ResearchPerson");
  }
};
